/**
 *
 * DB Connection
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { createConnection } from 'typeorm';
import { ConstantUtil } from '../../util/constants';
import { SnakeNamingStrategy } from '../naming-strategy/snake-case';
import { User } from '../../entity/User';
import { Wallet } from '../../entity/Wallet';
import { Transaction } from '../../entity/Transaction';
import { TransactionTypes  } from '../../entity/TransactionTypes';
import { Currencies  } from '../../entity/Currencies';

export const createDbConnection = async function (dropSchema?: boolean) {
    return createConnection({
        type: 'mysql',
        host: ConstantUtil.MYSQL_HOST,
        port: ConstantUtil.MYSQL_PORT,
        database: ConstantUtil.MYSQL_DATABASE,
        username: ConstantUtil.MYSQL_USERNAME,
        password: ConstantUtil.MYSQL_PASSWORD,
        namingStrategy: new SnakeNamingStrategy(),
        logging: process.env.ENVIRONMENT === 'prod' ? false : 'all',
        entities: [
            User, Wallet, Transaction, TransactionTypes, Currencies
        ],
        synchronize: false,
    });
};
