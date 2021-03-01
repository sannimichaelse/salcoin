/**
 *
 * Server
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';

import { createDbConnection } from './config/db/db-provider';
import { LoggerUtil } from './util/logger';
import { UserController } from './controller/user-controller';
import { appErrorHandler, genericErrorHandler, notFound } from './middleware/error-middleware';
import { WalletController } from './controller/wallet-controller';
import { TransactionController } from './controller/transaction-controller';
import TransactionProcessor from './service/transaction-processor';

export class Server {

    private PORT = Number(process.env.PORT) || 9001;

    // Set app to be of type express.Application
    private app: express.Application;
    private httpServer: http.Server;

    constructor() {
        this.start();
    }

    /**
     * Start Server
     */
    private async start(): Promise<boolean> {
        LoggerUtil.info('Starting server...');

        try {
            await createDbConnection();
            LoggerUtil.info('Success creating DB connection');
        } catch (error) {
            console.log(error);
            LoggerUtil.error('Error creating DB connection | error :', error);
            return false;
        }

        /**
         * Populate tables | TEST DATA
         * NOTE: Test only
         */
        if (process.env.ENVIRONMENT !== 'prod') {
            // await CommonUtil.populateTables();
        }

        this.app = express();
        await this.config();
        await this.routes();
        await this.serverListen();

        return true;
    }

    /**
     * Application Config
     */
    private async config(): Promise<boolean> {

        // Express middleware
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(bodyParser.json()); // for parsing application/json
        this.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        this.app.get('/', (req, res, next) => {
            return res.status(200).json({
                message: 'Welcome to Salcoin Api'
            });
        });

        return true;
    }

    /**
     * Application routes
     */
    private async routes(): Promise<boolean> {

        // Routing Controller | REST
        useExpressServer(this.app, {
            routePrefix: '/api',
            controllers: [
                UserController,
                WalletController,
                TransactionController
            ],
        });

        // // Error handlers
        // this.app.use(appErrorHandler);
        // this.app.use(genericErrorHandler);

        // Not found
        // this.app.use(notFound);
        return true;
    }

    /**
     * Listen
     */
    private async serverListen(): Promise<boolean> {

        this.httpServer = http.createServer(this.app);

        this.httpServer.listen({
            port: this.PORT,
            host: 'localhost',
        });
        this.httpServer.on('listening', async () => {
            LoggerUtil.info(`Server is listening on http://localhost:${this.PORT}`);
            await TransactionProcessor.startTransactionWorker();
        });
        this.httpServer.on('error', (error: NodeJS.ErrnoException) => {
            if (error.syscall !== 'listen') {
                throw error;
            }

            const bind = (typeof this.PORT === 'string') ? 'Pipe ' + this.PORT : 'Port ' + this.PORT;

            switch (error.code) {
                case 'EACCES':
                    LoggerUtil.error(`${bind} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    LoggerUtil.error(`${bind} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

        return true;
    }

}
