import { ConstantUtil } from '../util/constants';
import * as jwt from 'jsonwebtoken';
import { LoggerUtil } from '../util/logger';
import { CodeUtil } from '../util/response-codes';
import { Request } from 'express';

export function verifyToken(request, response: any, next ?: (err ?: any) => any): any {
    const secretKey = ConstantUtil.JWT_AUTH_SECRET_KEY;
    const MethodName = 'VerifyToken |';
    const token = request.headers['authorization'];
    LoggerUtil.info(MethodName, 'token :', token, '| secretKey :', secretKey);

    if (!token) {
        return response
            .status(CodeUtil.HTTP_STATUS_CODE_FORBIDDEN)
            .json({
                code: CodeUtil.HTTP_STATUS_CODE_FORBIDDEN,
                message: 'No token provided',
                status: 'error',
                data: null
            });
    }

    jwt.verify(token, secretKey, (error: any, decoded: any) => {
        if (error) {
            LoggerUtil.error(MethodName, 'error :', error, '| decoded :', decoded);
            return response
                .status(CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST)
                .json({
                    code: CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST,
                    message: 'Failed to authenticate token',
                    status: 'error',
                    data: null
                });
        }

        LoggerUtil.info(MethodName, ' decoded :', decoded);
        next();
    });
}