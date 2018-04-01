import Sequelize from "sequelize";
import config from "../../config/db.js";
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool
});
export default sequelize;