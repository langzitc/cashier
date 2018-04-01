import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex);
const resourceModel = {
	  state: {
				city: {
					province: "",
					city: ""
				},
				roleList: [{id:1,role: ""}],
				cityList: [],
				templateList: [],
				chanelList: [],
				chanelList2: [{id: 0,title: "根栏目",expand: false,checked: false}],
				storyTypeList: [{id: 0,title: "小说"}],
				storyTypeList2: [{id: 0,title: '小说'}]
	  },
	  mutations: {
	     getPosition(state,city){
	     		Object.assign(state.city,city);
	     },
	     getRoleList(state,rolelist){
	     		state.roleList = rolelist;
	     },
	     getCityList(state,city){
	     		state.cityList = city;
	     },
	     getTemplateList(state,list){
	     		state.templateList = list;
	     },
	     getChanelList(state,list){
	     		state.chanelList = list;
	     },
	     getChanelList2(state,list){
	     		state.chanelList2 = list;
	     },
	     getStoryTypeList(state,list){
	     		state.storyTypeList = list.data1;
	     		state.storyTypeList2 = list.data2;
	     }
	  },
	  actions: {
			getPosition(context){
					let script = document.createElement("script");
					let _this = this;
					script.src = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js";
					script.onload = script.onreadystatechange = function(){
					    if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
					    	context.commit("getPosition",remote_ip_info);    
					    }
					
					}	
					document.body.appendChild(script);
			},
			getRoleList(context,tocken){
				if(sessionStorage.getItem("tuchrolelist")){
					context.commit("getRoleList",JSON.parse(sessionStorage.getItem("tuchrolelist")));
				}else{
					reqwest({
					    url: '/service/rolelist',
							type: 'json',	
							data: {tocken: tocken},
					    method: 'get',
					}).then((res)=>{
							if(res.code === 200){
									context.commit("getRoleList",res.data);
							}
					})						
				}
			},
			getCityList(context){
				if(sessionStorage.getItem("tuchcitylist")){
					context.commit("getCityList",JSON.parse(sessionStorage.getItem("tuchcitylist")));
				}else{
					reqwest({
					    url: '/service/citylist',
							type: 'json',	
					    method: 'get',
					}).then((res)=>{
							if(res.code === 200){
									context.commit("getCityList",res.data);
							}
					}).fail((err,msg)=>{
						console.log(msg);
					})
				}				
			},
			getTemplateList(context){
					reqwest({
					    url: '/service/templatelist',
							type: 'json',	
					    method: 'get',
					}).then((res)=>{
							if(res.code === 200){
									context.commit("getTemplateList",res.data);
							}
					}).fail((err,msg)=>{
						console.log(msg);
					})						
			},
			getChanelList(context,type){
					reqwest({
					    url: '/service/chanellist',
							type: 'json',	
					    method: 'get',
					    data: {type: type},
					}).then((res)=>{
							if(res.code === 200){
									if(type === 0){
										context.commit("getChanelList",res.data);
									}else{
										context.commit("getChanelList2",res.data);
									}
							}
					}).fail((err,msg)=>{
						console.log(msg);
					})						
			},
			getStoryTypeList(context){
					reqwest({
					    url: '/service/storytypelist',
							type: 'json',	
					    method: 'get',
					}).then((res)=>{
							if(res.code === 200){
									context.commit("getStoryTypeList",res.data);
							}
					})					
			}
	  },
	  getters: {
	  	
	  }
}
let userInfo = sessionStorage.getItem("tuchuserinfo");
if(!userInfo){
	userInfo = {};
}else{
	userInfo = JSON.parse(userInfo);
}
const userModel = {
	state: userInfo,
	mutations: {
		login(state,res){
				Object.assign(state,res.data);
				sessionStorage.setItem("tuchuserinfo",JSON.stringify(res.data));
				router.push("/");				
		},
		destory(state){
			state = {};
			router.push("/login");
		}
	},
	actions: {
		login(context,user){
			reqwest({
			    url: '/service/login',
					type: 'json',					
			    method: 'post',
			    data: {username: user.username,password: user.password},
			}).then((res)=>{
					if(res.code === 200){
							context.commit("login",res);
							user.msg.success(res.msg);
							if(user.recode){
								localStorage.setItem("tuchusercodes",JSON.stringify({un: user.username,up: user.password}));
							}
					}else{
						user.msg.error(res.msg);
					}
			}).fail((err,msg)=>{
				console.log(msg);
			})
		},
		destory(context,d){
			sessionStorage.removeItem("tuchuserinfo");
			reqwest({
			    url: '/service/destory',
					type: 'json',					
			    method: 'post',
			    data: {tocken: d.tocken},
			}).then((res)=>{
					if(res.code === 200){
						context.commit("destory");
						d.msg.success(res.msg);
					}else{
						d.msg.error(res.msg);
					}
			}).fail((err,msg)=>{
				console.log(msg);
			})			
		}
	}
};
const controlModel = {
	state: {},
	mutations: {
		addUser(state){
			
		}
	},
	actions: {
		addUser(context,model){
			reqwest({
			    url: '/service/adduser',
					type: 'json',					
			    method: 'post',
			    data: model.data,
			}).then((res)=>{
					if(res.code === 200){
						context.commit("addUser");
						model.msg.success(res.msg);
					}else{
						model.msg.error(res.msg);
					}
			}).fail((err,msg)=>{
				console.log(msg);
			})				
		}
	}
};
const store = new Vuex.Store({
  modules: {
    resource: resourceModel,
    user: userModel,
    control: controlModel
  }
})
export default store;