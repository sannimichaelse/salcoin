/**
 *
 * User Repository
 * Create Update Delete Retrieve
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { NotFoundError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from '../entity/Transaction';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {

    async add(transaction: Transaction) {
        return await this.save(transaction);
    }

    async getTransactions(user_id: number) {
        const transaction = await this.find({user_id});
        if (!transaction) {
            throw new NotFoundError('Transaction not found');
        }

        return transaction;
    }

}