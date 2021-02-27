/**
 *
 * User Response
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { UpdateResult } from 'typeorm';
import { Wallet } from '../../entity/Wallet';
import { Response } from './Index';

export interface AllWalletResponse extends Response {
    data?: Wallet[];
}

export interface WalletResponse extends Response {
    data?: Wallet | UpdateResult;
}
