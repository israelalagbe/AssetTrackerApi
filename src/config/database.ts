module.exports = {
  dev: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOST!,
    dialect: 'mysql',
    logging: false,
  },
  staging: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOST!,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOST!,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};