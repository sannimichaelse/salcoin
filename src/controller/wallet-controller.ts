/**
 *
 * WalletController
 * Create Update Delete Retrieve
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { Body, BodyParam, ContentType, Get, JsonController, Param, Post, Put, Res, UseBefore } from 'routing-controllers';
import WalletService from '../service/wallet-service';
import { WalletRequest } from '../interface/request/Wallet';
import { Response } from 'express';
import { validateWalletMiddleware } from '../middleware/wallet-middleware';
import { verifyToken } from '../middleware/auth.middleware';
import { CurrentUser } from '../decorator/current-user';
import { Token } from '../interface/request/Token';

@JsonController('/wallet')
export class WalletController {

    private walletService = WalletService;

    @Post('')
    @UseBefore(validateWalletMiddleware)
    @UseBefore(verifyToken)
    @ContentType('application/json')
    async addWallet(
        @CurrentUser() currentUser: Token,
        @Body() request: WalletRequest,
        @Res() response: Response
    ) {
        const user_id = currentUser.id;
        const result = await this.walletService.add(request, user_id);
        return response.status(result.code).json(result);
    }

    @Get('')
    @UseBefore(verifyToken)
    @ContentType('application/json')
    async getWallet(
        @CurrentUser() currentUser: Token,
        @Body() request: WalletRequest,
        @Res() response: Response
    ) {
        const user_id = currentUser.id;
        const result = await this.walletService.getWallet(request, user_id);
        return response.status(result.code).json(result);
    }
}