import * as dotenv from 'dotenv';

dotenv.config();
const test = {
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.TEST_PORT,
  MYSQL_HOST: process.env.MYSQL_TEST_HOST,
  MYSQL_PORT: Number(process.env.MYSQL_TEST_PORT),
  MYSQL_DATABASE: process.env.MYSQL_TEST_DATABASE,
  MYSQL_USERNAME: process.env.MYSQL_TEST_USERNAME,
  MYSQL_PASSWORD: process.env.MYSQL_TEST_PASSWORD,
  JWT_AUTH_SECRET_KEY: process.env.JWT_AUTH_SECRET_KEY,
  JWT_RESET_PASSWORD_SECRET_KEY: process.env.JWT_RESET_PASSWORD_SECRET_KEY,
  QUEUE_URL : process.env.TEST_QUEUE_URL
};

export default test;
