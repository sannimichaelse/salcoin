import { validateTransaction } from '../schema/transaction';
import { CommonUtil } from '../util/common';
import { LoggerUtil } from '../util/logger';
import { CodeUtil } from '../util/response-codes';
import { baseMiddleware } from './base-middleware';

export function validateTransactionMiddleware(request: any, response: any, next?: (err?: any) => any): any {
  baseMiddleware(request, response, next)('validateTransactionMiddleware', validateTransaction);
}


export function validateUUID(request: any, response: any, next ?: (err ?: any) => any): any {
    const MethodName = 'validateUUID |';
    const uuid = request.params['uuid'];
    LoggerUtil.info(MethodName, 'uuid :', uuid);
    if (!uuid) {
        return response
            .status(CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST)
            .json({
                code: CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST,
                message: 'Please supply address as query param',
                status: 'error',
                data: null
            });
    }

    const isUUIDValid = CommonUtil.validateUUID(uuid);
    if (!isUUIDValid) {
        return response
            .status(CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST)
            .json({
                code: CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST,
                message: 'Invalid uuid',
                status: 'error',
                data: null
            });
    }

    next();
}