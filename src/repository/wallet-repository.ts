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
import { Wallet } from '../entity/Wallet';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {

    async add(wallet: Wallet) {
        return await this.save(wallet);
    }

    async getUserWallet(user_id: number) {
        const wallet = await this.findOne({user_id});
        if (!wallet) {
            throw new NotFoundError('Wallet not found');
        }

        return wallet;
    }

    async getWallets(user_id: number) {
        const wallet = await this.find({user_id});
        if (!wallet) {
            throw new NotFoundError('Wallets not found');
        }

        return wallet;
    }

    async updateWallet(wallet: Wallet) {
        return await this.update({ id : wallet.id }, wallet);
    }


}