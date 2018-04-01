import sequelize from "../data/data.js";
import Sequelize from "sequelize";
const StoryType = sequelize.define('storytype', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  rid: {
  	type: Sequelize.INTEGER,
  	defaultValue: 0
  }
}, 
{
  freezeTableName: false,
  createdAt: false,
  updatedAt: false,
  tableName: "tuch_story_type"
});
StoryType.jsonList = async function(){
	let list = await StoryType.findAll();
	let list2 = Array.from(list);
	let reset = function(arrs,rid = 0,type = false){
		let a = [];
		arrs.forEach((e)=>{
			if(e.rid === rid){
				let el = {};
				let c = reset(arrs,e.id,type);
				if(c.length){
					el.children = Array.from(c);
				}
				if(type){
					el.label = e.name;
					el.value = e.id;
					el.rid = e.rid;	
					el.id = e.id;
				}else{
					el.title = e.name;
					el.id = e.id;
					el.rid = e.rid;							
				}
				a.push(el);	
			}
		})		
		return a;
	}
	let arr = {data1: reset(list2),data2: reset(list2,0,true)}
	return arr;
}
export default StoryType;
