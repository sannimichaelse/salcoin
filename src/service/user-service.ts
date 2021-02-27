/**
 *
 * User Service
 * Create Update Delete Retrieve
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { EntityManager, getCustomRepository, In, Transaction, TransactionManager } from 'typeorm';
import { validate, Validator } from 'class-validator';
import { CodeUtil } from '../util/response-codes';
import { ConstantUtil } from '../util/constants';
import { LoggerUtil } from '../util/logger';
import { User } from '../entity/User';
import { UserRepository } from '../repository/user-repository';
import { SignupRequest, LoginRequest } from '../interface/request/user-request';
import { UserResponse } from '../interface/response/UserResponse';
import { AuthUtil } from '../util/auth';

class UserService {
    /**
     * signup
     * @param {object} SignupRequest
     * @return {object} UserResponse
     */
    public async signup(userRequest: SignupRequest): Promise<UserResponse> {
        const MethodName = 'Signup |';
        LoggerUtil.info(MethodName, 'UserRequest :', userRequest);

        const user = new User();
        user.description = userRequest.description;
        user.name = userRequest.name;
        user.status = ConstantUtil.ACTIVE;
        user.email = userRequest.email;
        user.password = AuthUtil.hashPassword(userRequest.password);
        user.createdAt = new Date();
        user.updatedAt = new Date();

        // Create user list
        try {
            const userRepository = getCustomRepository(UserRepository);
            const result = await userRepository.createAccount(user);
            delete result.password;
            LoggerUtil.info(MethodName, 'New user created successfully |', CodeUtil.CREATE_USER_SUCCESS);
            return {
                message: 'Success creating user ',
                code: CodeUtil.HTTP_STATUS_CODE_CREATED,
                status: 'success',
                data: result
            };
        } catch (error) {
            LoggerUtil.error(MethodName, 'Error creating user |  :', error.message, '|', CodeUtil.CREATE_USER_ERROR);
            let message = error.message;

            // Check if user email already exist
            if (error.message.indexOf('uniq_user_email') != -1) {
                message = 'Email already used';
            }

            return {
                message: message || 'Error creating user',
                code: CodeUtil.HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
                status: 'error',
                data: error
            };
        }
    }

    /**
     * login
     * @param {object} LoginRequest
     * @return {object} UserResponse
     */
    public async login(loginRequest: LoginRequest): Promise<UserResponse> {
        const MethodName = 'Login |';
        LoggerUtil.info(MethodName, 'UserRequest :', loginRequest);

        try {
            const userRepository = getCustomRepository(UserRepository);
            const result = await userRepository.findByEmail(loginRequest.email);
            const userPassword = loginRequest.password;
            const dbPassword = result.password;
            const passwordIsValid = AuthUtil.comparePassword(userPassword, dbPassword);

            if (!passwordIsValid) {
                LoggerUtil.info(MethodName, 'Wrong password and email combination |', result);
                return {
                    message: 'Wrong password and email combination',
                    code: CodeUtil.HTTP_STATUS_CODE_NOT_FOUND,
                    status: 'error',
                    data: null
                };
            }

            delete result.password;
            LoggerUtil.info(MethodName, 'User found |', result);
            LoggerUtil.info(MethodName, 'User found |', CodeUtil.RETRIEVE_USER_SUCCESS);
            LoggerUtil.info(MethodName, 'Login Success |', CodeUtil.LOGIN_SUCCESS);

            return {
                message: 'Authentication successful',
                code: CodeUtil.HTTP_STATUS_CODE_OK,
                status: 'success',
                data: result
            };

        } catch (error) {
            LoggerUtil.error(MethodName, 'Error logging in |  :', error.message, '|', CodeUtil.LOGIN_ERROR);
            const message = error.message;
            return {
                message: message || 'Error logging in',
                code: error.httpCode || CodeUtil.HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
                status: 'error',
                data: null
            };
        }
    }

}

export default new UserService();