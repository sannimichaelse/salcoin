/**
 *
 * User Response
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { Transaction } from '../../entity/Transaction';
import { Response } from '.';

export interface AllTransactionResponse extends Response {
    data?: Transaction[];
}

export interface TransactionResponse extends Response {
    data?: Transaction;
}
