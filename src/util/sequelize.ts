import { Dialect, Sequelize } from 'sequelize';
import env from '../config/env';

const database = require('../config/database')[env.name];

const sequelize = new Sequelize(
  database.database, database.username, database.password, {
  dialect: database.dialect as Dialect
});

export default sequelize;
