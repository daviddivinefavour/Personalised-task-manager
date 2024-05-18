/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config');
module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    seederStorage: 'json',
    seederStoragePath: 'sequelizeSeedData.json',
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    seederStorage: 'json',
    seederStoragePath: 'sequelizeSeedData.json',
  },
  staging: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    seederStorage: 'json',
    seederStoragePath: 'sequelizeSeedData.json',
  },
};
