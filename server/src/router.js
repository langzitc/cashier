import express from 'express';
import ejs from 'ejs';
import sequelize from "./data/data.js";
import md5 from 'md5';
import config from '../config/sys'
import util from './util'
import multer from 'multer'
import fs from 'fs'
import path from "path"
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	let paths = path.resolve("../upload",(new Date()).Format("yyyy-MM-dd"));
  	let flag = fs.existsSync(paths);
  	if(!flag){
  		fs.mkdirSync(paths);
  	}
    cb(null, paths);
  },
  filename: function (req, file, cb) {
  	let arr = file.originalname.split(".");
  	let prefix = arr[arr.length-1];
    cb(null, (new Date()).getTime()+"."+prefix);
  }
})
let upload = multer({ storage: storage });
let Role = sequelize.model("role");
let Info = sequelize.model("info");
let User = sequelize.model("user");
let Area = sequelize.model("area");
let Chanel = sequelize.model("chanel");
let Story = sequelize.model("story");
let StoryType = sequelize.model("storytype");	
let Collection = sequelize.model("collection");	
const router = express.Router();
function login(req){
	let password = md5(req.body.password);
	return sequelize.query(`SELECT * FROM TUCH_USER WHERE PASSWORD = '${password}' AND TEL = ${req.body.username} OR EMAIL = '${req.body.username}'`, 	{type:sequelize.QueryTypes.SELECT });
}
function restfuleGet(req,res){
	switch(req.params.param){
		case "rolelist":
			(async ()=>{
				let roleList = await Role.findAll();
				res.json({
					code: 200,
					data: roleList
				});
			})();
		break;
		case "userlist":
			(async ()=>{
				let page = req.query.page;
				let offset = parseInt(req.query.size);
				let limit = page*offset-offset;
				let list = await User.findAndCountAll({
				  limit: offset,
				  offset: limit,
				  where: {
				  	id: {
				  		$ne: 1
				  	}
				  },
				  include: [{
				  	model: Role,
				  	as: "role"
				  },{
				  	model: Info,
				  	as: "info"
				  }]
				});
				res.json(list);
			})();
		break;
		case "citylist":
			(async ()=>{	
				let pid = req.query.pid||0;
				let list = await Area.areaList(pid);
				res.json({
					code: 200,
					msg: "查询成功",
					data: list
				});
			})();			
		break;
		case "templatelist":
			let fileArr = util.getTemplate();
			res.json({
				code: 200,
				msg: "查询成功",
				data: fileArr
			});
		break;
		case "chanellist":
			(async ()=>{
			let type = parseInt(req.query.type);	
			let list = await Chanel.chanelList(req.query.rid,type);	
			res.json({
				code: 200,
				msg: "查询成功",
				data: list
			});				
			})();
		break;
		case "storytypelist":
			(async ()=>{			
				let list = await StoryType.jsonList();
				res.json({
					code: 200,
					msg: "查询成功",
					data: list
				});
			})();
		break;
		case "storylist":
			(async ()=>{			
				let page = req.query.page;
				let offset = parseInt(req.query.size);
				let limit = page*offset-offset;
				let list = await Story.findAndCountAll({
				  limit: offset,
				  offset: limit,
				  where: {
				  	id: {
				  		$ne: 1
				  	}
				  },				  
				  include: [{
				  	model: StoryType,
				  	as: "storytype"
				  }]
				});
				res.json(list);
			})();			
		break;
		default:
			res.json({
				msg: "接口错误",
				code: 404
			});
		break;
	}
}
function restfulePost(req,res){
	switch(req.params.param){
		case "login":
			(async()=>{
				try{
					let result = await login(req);
					let data = {};
					data.data = result[0]
					if(result.length){
						data.msg = "登录成功";
						data.code = 200;
						req.session.tocken = (new Date()).getTime()+""+data.data.tel;
						data.data.tocken = req.session.tocken;
					}else{
						data.msg = "登录失败";
						data.code = 500;
					}
					res.json(data);
				}catch(e){
					res.json({
						code: 500,
						msg: "系统错误"
					});
				}
			})();
		break;
		case "destory":
			req.session.tocken = null;
			res.json({
				code: 200,
				msg: "注销成功"
			});
		break;
		case "adduser":
			(async ()=>{
				let flag = await sequelize.query(`SELECT * FROM TUCH_USER WHERE TEL = ${req.body.tel} OR EMAIL = '${req.body.email}'`, 				{type:sequelize.QueryTypes.SELECT });
				if(flag.length){
					res.json({
						code: 203,
						msg: "手机号或邮箱已存在"
					});
				}else{
					let role = await Role.findById(req.body.role[0]);
					let info = Info.build();
					let user = User.build({
					    tel: req.body.tel,
					    password: md5(req.body.password),
					    email: req.body.email,
					    regtime: (new Date()).getTime(),
					    exptime: (new Date()).getTime(),
					});			
					await user.save();
					await info.save();
					await user.setRole(role);				
					await user.setInfo(info);
					res.json({
						code: 200,
						msg: "添加成功"
					});
				}
							
			})();
		break;
		case "addchanel":
			(async ()=>{
				let data = JSON.parse(JSON.stringify(req.body));
				delete data.tocken;
				let flag = await Chanel.create(data);
				res.json({
					code: 200,
					msg: "添加栏目成功"
				});				
			})();
		break;
		case "storytypeadd":
			(async ()=>{
				let data = JSON.parse(JSON.stringify(req.body));
				delete data.tocken;
				let flag = await StoryType.create(data);
				res.json({
					code: 200,
					msg: "添加分类成功"
				});				
			})();			
		break;
		case "storytypedel": 
			(async ()=>{
				let f = await StoryType.destroy({
					where: {
						id: req.body.id
					}
				});
				if(f){
					res.json({
						code: 200,
						msg: "删除成功"
					});					
				}else{
					res.json({
						code: 500,
						msg: "删除失败"
					});					
				}
			})();
		break;
		case "storytypeedit": 
			(async ()=>{
				let m = await StoryType.findById(req.body.id);
				let d = await m.updateAttributes(req.body);
				if(d){
					res.json({
						code: 200,
						msg: "更新成功"
					});					
				}else{
					res.json({
						code: 500,
						msg: "更新失败"
					});					
				}
			})();
		break;	
		case "addtask":
			(async ()=>{
				let data = JSON.parse(JSON.stringify(req.body));
				delete data.tocken;
				let col = await Collection.build(data);
				await col.save();
				res.json({
					code: 200,
					msg: "添加任务成功"
				});					
			})();
		break;
		default:
			res.json({
				msg: "接口错误",
				code: 404
			});
		break;
	}
}
router.get("/",(req,res)=>{
    res.render('home.ejs', {
        name: 'tinyphp'
    });
})
router.get("/index.html",(req,res)=>{
    res.render('home.ejs', {
        name: 'tinyphp'
    });
})
router.get("/service/:param",(req,res,next)=>{
	let flag = config.externalroute.includes(req.params.param);
	if(!flag){
		if(req.session.tocken&&req.query.tocken&&req.session.tocken===req.query.tocken){
			next();
		}else{
			res.json({
				code: 202,
				msg: "用户未登录"
			});
		}
	}else{
		next();
	}
})
router.post("/service/:param",(req,res,next)=>{
	let flag = config.externalroute.includes(req.params.param);
	if(!flag){
		if(req.session.tocken&&req.body.tocken&&req.session.tocken===req.body.tocken){
			next();
		}else{
			res.json({
				code: 202,
				msg: "用户未登录"
			});
		}
	}else{
		next();
	}
})
router.post("/service/upload/fileupload",upload.single('file'),(req,res,next)=>{
	if(req.session.tocken&&req.body.tocken&&req.session.tocken===req.body.tocken){
		let a = req.file.path;
		let c = a.split("web");
		let d = c[1].replace(/\\/g,"/");
		res.json({
			code: 200,
			msg: "上传成功",
			path: d
		});
	}else{
		res.json({
			code: 202,
			msg: "用户未登录"
		});
	}
})
router.post("/service/:param",(req,res,next)=>{
	restfulePost(req,res,next);
})
router.get("/service/:param",(req,res,next)=>{
	restfuleGet(req,res,next);
})
router.get("*",(req,res)=>{
	res.render('404.ejs');	
})
export default router;