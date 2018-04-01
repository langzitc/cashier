import sequelize from "../data/data.js";
import Sequelize from "sequelize";
const Story = sequelize.define('story', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  seotitle: {
  	type: Sequelize.STRING(50)
  },
  description: {
  	type: Sequelize.TEXT
  },
  img: {
  	type: Sequelize.STRING(100)
  },
  keywords: {
  	type: Sequelize.STRING(50)
  },
  publish_time: {
  	type: Sequelize.BIGINT,
  	allowNull: false
  },
  edit_time: {
  	type: Sequelize.BIGINT
  },
  source: {
  	type: Sequelize.STRING(100),
  	defaultValue: "TUCH"
  },
  author: {
  	type: Sequelize.STRING(30),
  	defaultValue: "TUCH"
  },
  path: {
  	type: Sequelize.STRING(100)
  }
}, 
{
  freezeTableName: false,
  createdAt: false,
  updatedAt: false,
  tableName: "tuch_story"
});

export default Story;
