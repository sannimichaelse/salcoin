/**
 *
 * TransactionService
 * Create Update Delete Retrieve
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa*
 * * * * * * * * * * * * * * * * *
 *
 */

import { EntityManager, getCustomRepository, In, TransactionManager } from 'typeorm';
import { CodeUtil } from '../util/response-codes';
import { LoggerUtil } from '../util/logger';
import { TransactionRepository } from '../repository/transaction-repository';
import { CurrencyRepository } from '../repository/currency-repository';
import { WalletRepository } from '../repository/wallet-repository';
import { AllTransactionResponse, TransactionResponse } from '../interface/response/Transaction';
import { Transaction } from '../entity/Transaction';
import { TransactionRequest } from '../interface/request/Transaction';
import { CommonUtil } from '../util/common';
import TransactionProcessor from '../service/transaction-processor';
import walletService from './wallet-service';
import { Wallet } from '../entity/Wallet';

class TransactionService {
    /**
     * getTransaction
     * @param {object} request
     * @return {object} AllTransactionResponse
     */
    public async getTransaction(request: TransactionRequest, user_id: number): Promise <AllTransactionResponse> {
        const MethodName = 'getWallet |';
        LoggerUtil.info(MethodName, 'request :', request, ' | user_id : ', user_id);

        try {
            const transationRepository = getCustomRepository(TransactionRepository);
            const result = await transationRepository.getTransactions(user_id);
            LoggerUtil.info(MethodName, 'User transactions fetched successfully |', CodeUtil.RETRIEVE_ACCOUNT_SUCCESS);
            return {
                message: 'Transactions fetched successfully',
                code: CodeUtil.HTTP_STATUS_CODE_CREATED,
                status: 'success',
                data: result
            };
        } catch (error) {
            LoggerUtil.error(MethodName, 'Error fetching transactions |  :', error.message, '|', CodeUtil.RETRIEVE_ACCOUNT_ERROR);
            const message = error.message;
            return {
                message: message || 'Error fetching transactions',
                code: CodeUtil.HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
                status: 'error',
                data: error
            };
        }
    }

    /**
     * add
     * @param {object} transactionRequest
     * @return {object} TransactionResponse
     */
    public async add(transactionRequest: TransactionRequest, user_id: number): Promise <TransactionResponse> {
        const MethodName = 'Add |';
        LoggerUtil.info(MethodName, 'UserRequest :', transactionRequest);

        try {
            const currencyRepository = getCustomRepository(CurrencyRepository);
            const walletRepository = getCustomRepository(WalletRepository);
            const currency = await currencyRepository.getCurrency(transactionRequest.currency);
            // Check if source and destination address is valid
            const valid_address = await this.validateWalletAddress(
                walletRepository,
                transactionRequest.source_address,
                transactionRequest.destination_address,
                user_id
            );

            if (!valid_address) {
                return {
                    message: 'Invalid source or destination address',
                    code: CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST,
                    status: 'error',
                    data: null
                };
            }

            if (transactionRequest.source_address === transactionRequest.destination_address) {
                return {
                    message: 'Invalid transaction. You cant transfer or withdraw from source to source',
                    code: CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST,
                    status: 'error',
                    data: null
                };
            }

            // Check for enough balance
            const enough_source_balance = await this.checkWalletAddressBalance(
                walletRepository,
                transactionRequest.amount,
                transactionRequest.source_address,
                user_id
            );

            if (!enough_source_balance) {
                 return {
                    message: 'Insufficient funds',
                    code: CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST,
                    status: 'error',
                    data: null
                };
            }

            await this.queueTransactions(
                transactionRequest,
                currency.id,
                user_id
            );

            LoggerUtil.info(MethodName, 'Transaction has been processed |');
            return {
                message: 'Transaction has been processed',
                code: CodeUtil.HTTP_STATUS_CODE_OK,
                status: 'success',
                data: null
            };
        } catch (error) {
            LoggerUtil.error(MethodName, 'Error adding transaction |  :', error.message, '|', CodeUtil.CREATE_USER_ERROR);
            const message = error.message;
            return {
                message: message || 'Error adding transaction',
                code: CodeUtil.HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
                status: 'error',
                data: error
            };
        }
    }



    /**
     * queueTransactions
     * @param {object} transactionRequest
     * @param {object} currency_id
     * @return {object} Promise<void>
     */
    private async queueTransactions(
        transactionRequest: TransactionRequest,
        currency_id: number,
        user_id: number
    ): Promise<void>{

        await TransactionProcessor.connect();
        await TransactionProcessor.addTransactionsToQueue({
            request: transactionRequest,
            currency_id,
            user_id
        });
    }

    /**
     * checkWalletAddressBalance
     * @param {object} walletRepository
     * @param {object} amount
     * @return {object} Promise<boolean>
     */
    private async checkWalletAddressBalance(
        walletRepository: WalletRepository,
        amount: number,
        address: string,
        user_id: number
    ): Promise <boolean> {

        const wallet =  await walletRepository.getUserWalletByAddress(address, user_id);
        const wallet_balance = Number(wallet.balance);
        if (wallet_balance > amount) {
            return true;
        }

        return false;
    }

    /**
     * validateWalletAddress
     * @param {object} source_address
     * @param {object} destination_address
     * @return {object} Promise<Wallet>
     */
    private async validateWalletAddress(
        walletRepository: WalletRepository,
        source_address: string,
        destination_address: string,
        user_id: number,
    ): Promise <boolean> {

        const source_valid =  await this.findWalletAddress(walletRepository, source_address, user_id);
        const destination_valid = await this.findWalletAddress(walletRepository, destination_address, user_id);

        if (!source_valid || !destination_valid) {
            return false;
        }

        return true;
    }

    /**
     * findWalletAddress
     * @param {object} walletRepository
     * @param {object} wallet_address
     * @return {object} Promise<Wallet>
     */
    private async findWalletAddress(
        walletRepository: WalletRepository,
        walletAddress: string,
        userId: number,
    ): Promise<boolean> {
        const result = await walletRepository.checkIfUserWalletExists(walletAddress, userId);
        return result;
    }

    /**
     * addTransaction
     * @param {object} transactionRepository
     * @return {object} Promise<Wallet>
     */
    public async addTransaction(
        transactionRequest: TransactionRequest,
        currency_id: number,
        user_id: number
    ): Promise <Transaction> {
        const transactionRepository = getCustomRepository(TransactionRepository);
        const transaction = new Transaction();
        console.log(transactionRequest);
        transaction.source_address = transactionRequest.source_address;
        transaction.destination_address = transactionRequest.destination_address;
        transaction.user_id = user_id;
        transaction.createdAt = new Date();
        transaction.updatedAt = new Date();
        transaction.amount = transactionRequest.amount;
        transaction.type = transactionRequest.type;
        transaction.state = 'completed';
        transaction.currency_id = currency_id;
        transaction.transaction_id = CommonUtil.generateUUID();
        const result = await transactionRepository.add(transaction);

        if (transactionRequest.type === 'withdrawal' || transactionRequest.type === 'transfer') {
            // deduct source wallet;
            await walletService.deductBalance(
                transactionRequest.amount,
                transactionRequest.source_address,
                user_id
            );
        }


        if (transactionRequest.type === 'transfer') {
            // credit destination wallet;
            await walletService.updateWallet(
                transactionRequest.amount,
                transactionRequest.destination_address,
                'credit'
            );
        }

        return result;
    }

}

export default new TransactionService();