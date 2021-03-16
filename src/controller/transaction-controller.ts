/**
 *
 * UserController
 * Create Update Delete Retrieve
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { Body, BodyParam, ContentType, Get, JsonController, Param, Post, Put, Res, UseBefore } from 'routing-controllers';
import TransactionService from '../service/transaction-service';
import { Response } from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { CurrentUser } from '../decorator/current-user';
import { Token } from '../interface/request/Token';
import { validateTransactionMiddleware, validateUUID } from '../middleware/transaction-middleware';
import { TransactionRequest } from '../interface/request/Transaction';

@JsonController('/transaction')
export class TransactionController {

    private transactionService = TransactionService;

    @Post('')
    @UseBefore(validateTransactionMiddleware)
    @UseBefore(verifyToken)
    @ContentType('application/json')
    async addTransaction(
        @CurrentUser() currentUser: Token,
        @Body() request: TransactionRequest,
        @Res() response: Response
    ) {
        const user_id = currentUser.id;
        const result = await this.transactionService.add(request, user_id);
        return response.status(result.code).json(result);
    }

    @Get('')
    @UseBefore(verifyToken)
    @ContentType('application/json')
    async getTransaction(
        @CurrentUser() currentUser: Token,
        @Body() request: TransactionRequest,
        @Res() response: Response
    ) {
        const user_id = currentUser.id;
        const result = await this.transactionService.getTransaction(request, user_id);
        return response.status(result.code).json(result);
    }

    @Get('/history/:uuid')
    @UseBefore(verifyToken)
    @UseBefore(validateUUID)
    @ContentType('application/json')
    async getTransactionHistory(
        @CurrentUser() currentUser: Token,
        @Param('uuid') uuid: string,
        @Res() response: Response
    ) {
        const user_id = currentUser.id;
        const result = await this.transactionService.getTransactionHistory(uuid, user_id);
        return response.status(result.code).json(result);
    }
}