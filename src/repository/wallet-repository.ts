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

    async getUserWallet(address: string): Promise<Wallet> {
        const wallet = await this.findOne({address});
        if (!wallet) {
            throw new NotFoundError('Wallet not found');
        }

        return wallet;
    }

    async checkIfUserWalletExists(address: string, user_id: number): Promise<boolean> {
        const wallet = await this.findOne({address, user_id});
        if (!wallet) {
            return false;
        }

        return true;
    }

    async getWallets(user_id: number): Promise<Wallet[]> {
        const wallet = await this.find({user_id});
        if (!wallet) {
            throw new NotFoundError('Wallets not found');
        }

        return wallet;
    }

    async getUserWalletByAddress(address: string, user_id: number): Promise<Wallet> {
        const wallet = await this.findOne({address, user_id});
        return wallet;
    }

    async updateWallet(address: string, wallet: Wallet) {
        return await this.update({ address}, wallet);
    }


}