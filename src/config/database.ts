module.exports = {
  test: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOST!,
    dialect: process.env.DATABASE_DIALET!,
    logging: false,
    storage: ':memory:'
  },
  dev: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOST!,
    dialect: process.env.DATABASE_DIALET!,
    logging: false,
  },
  staging: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOST!,
    dialect: process.env.DATABASE_DIALET!,
    logging: false,
  },
  production: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOST!,
    dialect: process.env.DATABASE_DIALET!,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};