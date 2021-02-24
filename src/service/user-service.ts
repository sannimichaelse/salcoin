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
import { CommonUtil } from '../util/common';
import { ConstantUtil } from '../util/constants';
import { LoggerUtil } from '../util/logger';
import { User } from '../entity/User';
import { UserRepository } from '../repository/user-repository';
import { UserRequest } from '../interface/request/api/UserRequest';
import { UserResponse } from '../interface/response/UserResponse';
import { UserListResponse } from '../interface/response/UserListResponse';

class UserService {
    /**
     * Note: For testing purposes only. Not to be used in production.
     * Create Test User List
     * @param {object[]} lstUserRequest
     * @return {object} UserListResponse
     */
    public async signup(userRequest: UserRequest): Promise<UserResponse> {
        const MethodName = 'Signup |';
        LoggerUtil.info(MethodName, 'UserRequest :', userRequest);

        const user = new User();
        user.description = userRequest.description;
        user.name = userRequest.name;
        user.status = ConstantUtil.ACTIVE;
        user.email = userRequest.email;
        user.password = userRequest.password;
        user.createdAt = new Date();
        user.updatedAt = new Date();

        // Create user list
        try {
            const userRepository = getCustomRepository(UserRepository);
            const result = await userRepository.save(user);
            LoggerUtil.info(MethodName, 'Success creating user |', CodeUtil.CREATE_USER_SUCCESS);
            return {
                message: 'Success creating user ',
                code: CodeUtil.CREATE_USER_SUCCESS,
                status: 'success',
                data: result
            };
        } catch (error) {
            LoggerUtil.error(MethodName, 'Error creating test user list | error :', error.message, '|', CodeUtil.CREATE_USER_ERROR);
            let message = null;

            // Check if user email already exist
            if (error.message.indexOf('unq_user_email') != -1) {
                message = 'Email already used';
            }

            return {
                message: message || 'Error creating test user list',
                code: CodeUtil.CREATE_USER_ERROR,
                status: 'error',
                data: error
            };
        }
    }

}

export default new UserService();