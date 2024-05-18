import { SequelizeModuleOptions } from '@nestjs/sequelize';
require('dotenv/config');

const { DB_HOST, DB_USERNAME, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

const database: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: DB_HOST,
  username: DB_USERNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT as unknown as number,
  autoLoadModels: true,
  synchronize: false,
  logging: false,
};

export default {
  port: parseInt(process.env.PORT, 10) || 3000,
  database,
};
