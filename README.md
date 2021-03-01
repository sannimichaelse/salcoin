# salcoin

## Local Setup

To run the API locally:

1. Clone the repository https://github.com/sannimichaelse/salcoin.git
2. cd salcoin and run npm install
3. Add a ormconfig.json file at the root of the project for migrations. You can check ormconfig-example.json file:

```
{
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "",
   "password": "",
   "database": "",
   "migrations": [
        "migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "migrations"
    }
}
```
4. Update .env file, check .env-sample
```
NODE_ENV=
ENVIRONMENT=
PORT=
SHOW_DEBUG_LOGS=

APP_NAME=

MYSQL_HOST=
MYSQL_PORT=
MYSQL_DATABASE=
MYSQL_USERNAME=
MYSQL_PASSWORD=

JWT_AUTH_SECRET_KEY=

QUEUE_URL=

```
5. npm start

## Database Setup
- Make sure the typeorm cli is installed. To run migrations
```
npm run typeorm migration:run 
```

## Main Libraries

- [Express](http://expressjs.com/) - Web framework
- [routing-controllers](https://github.com/typestack/routing-controllers) - Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework.
- [TypeORM](https://github.com/typeorm/typeorm) - TypeScript ORM
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects.

## Work in progress
- Writing test
- Tidy up deployment
## Postman Collection
https://documenter.getpostman.com/view/3064040/TWDdjDur
