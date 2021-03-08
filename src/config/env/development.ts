import * as dotenv from 'dotenv';

dotenv.config();
const development = {
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.PORT,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: Number(process.env.MYSQL_PORT),
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_USERNAME: process.env.MYSQL_USERNAME,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  JWT_AUTH_SECRET_KEY: process.env.JWT_AUTH_SECRET_KEY,
  JWT_RESET_PASSWORD_SECRET_KEY: process.env.JWT_RESET_PASSWORD_SECRET_KEY,
  QUEUE_URL : process.env.QUEUE_URL
};

export default development;