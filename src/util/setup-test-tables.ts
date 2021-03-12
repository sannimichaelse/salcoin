
import cmd from 'node-cmd';
import { getCustomRepository } from 'typeorm';
import { TransactionRepository } from '../repository/transaction-repository';
import { WalletRepository } from '../repository/wallet-repository';
import { UserRepository } from '../repository/user-repository';
import { createDbConnection } from '../config/db/db-provider';



// tslint:disable-next-line:class-name
export default class Test {

    public async tearDown(): Promise<any> {
        try {
            await createDbConnection();
            const transationRepository = getCustomRepository(TransactionRepository);
            const walletRepository = getCustomRepository(WalletRepository);
            const userRepository = getCustomRepository(UserRepository);
            await transationRepository.clear();
            await walletRepository.clear();
            await userRepository.clear();
        } catch (err) {
            console.log(err);
        }
    }

}
