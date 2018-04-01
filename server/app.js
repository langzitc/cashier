import sequelize from "./src/data/data.js"
import User from './src/bean/User.js'
import Role from './src/bean/Role.js'
import Info from './src/bean/Info.js'
import Chanel from './src/bean/Chanel.js'
import Area from './src/bean/Area.js'
import Article from './src/bean/Article.js'
import Story from './src/bean/Story.js'
import StoryType from './src/bean/StoryType.js'
import Collection from './src/bean/Collection.js'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'
import router from './src/router.js'
import  './src/collection.js'
import './src/task.js'
const app = express();
User.belongsTo(Role,{foreignKey: "roleid"});
User.belongsTo(Info,{foreignKey: "infoid"});
Article.belongsTo(Chanel,{foreignKey: "cid"});
Story.belongsTo(StoryType,{foreignKey: "typeid"});
Collection.belongsTo(StoryType,{foreignKey: "typeid"});
sequelize.sync({force: false}).then(function () {
console.log("数据库同步成功");
});
app.use(session({
    secret: 'ilue igauto',
    cookie: {maxAge: 1800000},  //设置maxAge是1800000ms，即30分钟后session和相应的cookie失效过期
    rolling: true,
    resave:true,
    saveUninitialized: false
}));
app.use("/static",express.static(path.join("../", 'static')));
app.use("/upload",express.static(path.join("../", 'upload')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", 'ejs');
app.set('views', __dirname + '/src/view');
app.use('/', router);
app.listen(4000);
