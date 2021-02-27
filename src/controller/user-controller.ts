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
import UserService from '../service/user-service';
import { LoginRequest, SignupRequest } from '../interface/request/User';
import { Response } from 'express';
import {
    validateSignupMiddleware,
    validateLoginMiddleware
} from '../middleware/user-middleware';

@JsonController('/auth')
export class UserController {

    private userService = UserService;

    @Post('/signup')
    @UseBefore(validateSignupMiddleware)
    @ContentType('application/json')
    async signup(
        @Body() request: SignupRequest,
        @Res() response: Response
    ) {
        const result = await this.userService.signup(request);
        return response.status(result.code).json(result);
    }

    @Post('/login')
    @UseBefore(validateLoginMiddleware)
    @ContentType('application/json')
    async login(
        @Body() request: LoginRequest,
        @Res() response: Response
    ) {
        const result = await this.userService.login(request);
        return response.status(result.code).json(result);
    }
}