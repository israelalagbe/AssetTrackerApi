import { Dialect, Sequelize } from 'sequelize';
import database from '../config/database';


const sequelize = new Sequelize(database.database, database.username, database.password, {
  dialect: database.dialect as Dialect
});

export default sequelize;
