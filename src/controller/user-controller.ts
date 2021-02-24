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

import { Body, BodyParam, ContentType, Get, JsonController, Param, Post, Put, Res } from 'routing-controllers';
import { Response } from 'express';
import UserService from '../service/user-service';
import { UserRequest } from '../interface/request/api/UserRequest';

@JsonController('/auth')
export class UserController {

    private userService = UserService;

    @Post('/signup')
    @ContentType('application/json')
    async signup(
        @Body() request: UserRequest,
        @Res() response: Response
    ) {
        const result = await this.userService.signup(request);
        return response.status(result.code).json(result);
    }
}