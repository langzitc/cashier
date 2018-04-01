import sequelize from "../data/data.js";
import Sequelize from "sequelize";
const Area = sequelize.define('area', {
  id: {
  	type: Sequelize.INTEGER(10),
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  areaname: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  parentid: {
  	type: Sequelize.INTEGER(10),
  	allowNull: false
  },
  shortname: {
  	type: Sequelize.STRING(50),
  },
  areacode: {
  	type: Sequelize.INTEGER(6)
  },
  zipcode: {
  	type: Sequelize.INTEGER(10)
  },
  pinyin: {
  	type: Sequelize.STRING(100)
  },
  lng: {
  	type: Sequelize.STRING(20)
  },
  lat: {
  	type: Sequelize.STRING(20)
  },
  level: {
  	type: Sequelize.INTEGER(1),
  	allowNull: false,
  	defaultValue: 1
  },
  position: {
  	type: Sequelize.STRING(255),
  	allowNull: false
  }    
}, 
{
  freezeTableName: false,
  createdAt: false,
  updatedAt: false,
  tableName: "tuch_area"
});
Area.areaList = async function(pid = 0){
		let list =  await Area.findAll({
			where: {
				parentid: pid
			}
		});
		return list;
}
export default Area;
