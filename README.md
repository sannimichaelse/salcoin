## SALCOIN API

A simple cryptocurrency system that allows users to create different wallets, bitcoin, ethereum and transfer coins using a unqiue address

---

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node

-   #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

-   #### Node installation on Ubuntu

    You can install nodejs and npm easily with apt install, just run the following commands.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   #### Other Operating Systems
    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn


## Install

    $ git clone https://github.com/sannimichaelse/salcoin.git
    $ cd salcoin
    $ yarn install or npm install

## Configure app

create a `.env` file then add the following values.

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

## Database Setup
Make sure the typeorm cli is installed. To run migrations

    $ npm run typeorm migration:run 

## Running the project - development

    $ npm run start 

## Running the project - production

    $ npm run start 
     

## Running Tests

    Start the test server - It runs on a different port 
    $ npm run test:server 

    Run the tests
    $ npm test 

<!-- ## Running Coverage

    $ npm run coverage  -->

## Libraries Used

- [Express](http://expressjs.com/) - Web framework
- [routing-controllers](https://github.com/typestack/routing-controllers) - Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework.
- [TypeORM](https://github.com/typeorm/typeorm) - TypeScript ORM
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects.

## Documentation

-   [Postman Collection](https://documenter.getpostman.com/view/3064040/TWDdjDur)
