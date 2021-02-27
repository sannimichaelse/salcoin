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

import { EntityManager, getCustomRepository, In, Transaction, TransactionManager } from 'typeorm';
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
     * signup
     * @param {object} getWallet
     * @return {object} WalletResponse
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
                code: CodeUtil.HTTP_STATUS_CODE_CREATED,
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
     * @return {object} WalletResponse
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
                    const wallet = new Wallet();
                    wallet.balance = Number(userWallet[walletIndex].balance) + Number(walletRequest.amount);
                    wallet.id = userWallet[walletIndex].id;
                    await walletRepository.updateWallet(wallet);
                    LoggerUtil.info(MethodName, 'Wallet updated successfully |', userWallet[walletIndex]);
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
     * addWallet
     * @param {object} walletRepository
     * @return {object} Promise<Wallet>
     */
    private async addWallet(
        walletRepository: WalletRepository,
        amount: number,
        currency_id: number,
        user_id: number
    ): Promise < Wallet > {
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

}

export default new WalletService();