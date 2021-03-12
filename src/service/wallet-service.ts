/**
 *
 * WalletService
 * Create Update Delete Retrieve
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa*
 * * * * * * * * * * * * * * * * *
 *
 */

import { getCustomRepository } from 'typeorm';
import { CodeUtil } from '../util/response-codes';
import { LoggerUtil } from '../util/logger';
import { WalletRepository } from '../repository/wallet-repository';
import { CurrencyRepository } from '../repository/currency-repository';
import { AllWalletResponse, WalletResponse } from '../interface/response/Wallet';
import { Wallet } from '../entity/Wallet';
import { WalletRequest } from '../interface/request/Wallet';
import { CommonUtil } from '../util/common';

class WalletService {
    /**
     * getWallet
     * @param {object} request
     * @param {number} user_id
     * @return {Promise} Promise<AllWalletResponse>
     */
    public async getWallet(request: WalletRequest, user_id: number): Promise <AllWalletResponse> {
        const MethodName = 'getWallet |';
        LoggerUtil.info(MethodName, 'request :', request, ' | user_id : ', user_id);

        try {
            const walletRepository = getCustomRepository(WalletRepository);
            const result = await walletRepository.getWallets(user_id);
            LoggerUtil.info(MethodName, 'User wallet fetched successfully |', CodeUtil.RETRIEVE_ACCOUNT_SUCCESS);
            return {
                message: 'Wallet fetched successfully',
                code: CodeUtil.HTTP_STATUS_CODE_OK,
                status: 'success',
                data: result
            };
        } catch (error) {
            LoggerUtil.error(MethodName, 'Error fetching wallet |  :', error.message, '|', CodeUtil.RETRIEVE_ACCOUNT_ERROR);
            const message = error.message;
            return {
                message: message || 'Error fetching wallet',
                code: CodeUtil.HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
                status: 'error',
                data: error
            };
        }
    }

    /**
     * add
     * @param {object} walletRequest
     * @param {number} user_id
     * @return {Promise} Promise<WalletResponse>
     */
    public async add(walletRequest: WalletRequest, user_id: number): Promise <WalletResponse> {
        const MethodName = 'Add |';
        LoggerUtil.info(MethodName, 'UserRequest :', walletRequest);

        try {
            const walletRepository = getCustomRepository(WalletRepository);
            const currencyRepository = getCustomRepository(CurrencyRepository);
            const currency = await currencyRepository.getCurrency(walletRequest.currency);
            const userWallet = await walletRepository.getWallets(user_id);
            const walletIndex = userWallet.findIndex((element) => element.currency_id == currency.id);
            if (userWallet.length === 0 || walletIndex < 0) {
                const result = await this.addWallet(
                    walletRepository,
                    walletRequest.amount,
                    currency.id,
                    user_id,
                );
                LoggerUtil.info(MethodName, 'Wallet created successfully |', result);
                return {
                    message: 'Wallet created successfully',
                    code: CodeUtil.HTTP_STATUS_CODE_OK,
                    status: 'success',
                    data: result
                };
            } else {
                const walletIndex = userWallet.findIndex((element) => element.currency_id == currency.id);
                if (walletIndex >= 0) {
                    const wallet_address = userWallet[walletIndex].address;
                    await this.updateWallet(
                        walletRequest.amount,
                        wallet_address,
                        'credit'
                    );

                    return {
                        message: 'Wallet updated successfully',
                        code: CodeUtil.HTTP_STATUS_CODE_OK,
                        status: 'success',
                        data: null
                    };
                }
            }
        } catch (error) {
            LoggerUtil.error(MethodName, 'Error adding wallet |  :', error.message, '|', CodeUtil.CREATE_USER_ERROR);
            const message = error.message;
            return {
                message: message || 'Error adding wallet',
                code: CodeUtil.HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
                status: 'error',
                data: error
            };
        }
    }

    /**
     * updateWallet
     * @param {number} amount
     * @param {string} address
     * @param {string} type
     * @return {Promise} Promise<any>
     */
    public async updateWallet(
        amount: number,
        address: string,
        type: string
    ): Promise <any> {
        const walletRepository = getCustomRepository(WalletRepository);
        const userWallet = await walletRepository.getUserWallet(address);
        const wallet = new Wallet();
        const MethodName = 'updateWallet | ';
        const walletBalance = Number(userWallet.balance);
        if (type === 'debit') {
            const newBalance = walletBalance - amount;
            wallet.balance = newBalance;
        }

        if (type === 'credit') {
            const newBalance = walletBalance + amount;
            wallet.balance = newBalance;
        }

        await walletRepository.updateWallet(address, wallet);
        LoggerUtil.info(MethodName, 'Wallet updated successfully |', wallet);
        return 'done';
    }

    /**
     * addWallet
     * @param {object} walletRepository
     * @param {number} amount
     * @param {number} currency_id
     * @param {number} user_id
     * @return {Promise} Promise<Wallet>
     */
    private async addWallet(
        walletRepository: WalletRepository,
        amount: number,
        currency_id: number,
        user_id: number
    ): Promise <Wallet> {
        const wallet = new Wallet();
        wallet.address = CommonUtil.generateUUID();
        wallet.balance = amount;
        wallet.user_id = user_id;
        wallet.createdAt = new Date();
        wallet.updatedAt = new Date();
        wallet.currency_id = currency_id;
        const result = await walletRepository.add(wallet);
        return result;
    }

    /**
     * deductBalance
     * @param {number} amount
     * @param {string} address
     * @param {number} user_id
     * @return {Promise} Promise<any>
     */
    public async deductBalance(
        amount: number,
        address: string,
        user_id: number
    ): Promise <any> {
        const MethodName = 'deductBalance | ';
        const walletRepository = getCustomRepository(WalletRepository);
        const wallet = await walletRepository.getUserWalletByAddress(address, user_id);
        const walletBalance = Number(wallet.balance);

        if (walletBalance < amount) {
            return {
                message: 'Insufficient funds',
                code: CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST,
                status: 'error',
                data: null
            };
        }

        await this.updateWallet(
            amount,
            wallet.address,
            'debit'
        );

        return wallet;
    }

}

export default new WalletService();