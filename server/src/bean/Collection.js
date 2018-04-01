import sequelize from "../data/data.js";
import Sequelize from "sequelize";
const Collection = sequelize.define('collection', {
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
  save_path: {
  	type: Sequelize.STRING(100)
  },
  source_path: {
  	type: Sequelize.STRING(100)
  },
  finished: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: false
  },
  start_time: {
  	type: Sequelize.BIGINT
  },
  end_time: {
  	type: Sequelize.BIGINT
  },
  auto_import: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: true
  },
  is_import: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: false
  },
  auto_collection: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: false
  },
  task_time_type: {
  	type: Sequelize.STRING(20),
		defaultValue: "day"
  },
  task_time: {
  	type: Sequelize.BIGINT
  },
  rules: {
  	type: Sequelize.TEXT
  }
}, 
{
  freezeTableName: false,
  createdAt: false,
  updatedAt: false,
  tableName: "tuch_collection"
});

export default Collection;