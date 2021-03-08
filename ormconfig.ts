import config from './src/config/index';
require('dotenv/config');
export = {
   'type': 'mysql',
   'host': config.MYSQL_HOST,
   'port': config.MYSQL_PORT,
   'username': config.MYSQL_USERNAME,
   'password': config.MYSQL_PASSWORD,
   'database': config.MYSQL_DATABASE,
   'synchronize': true,
   'migrations': [
        'migrations/*.ts'
    ],
    'cli': {
        'migrationsDir': 'migrations'
    }
};
