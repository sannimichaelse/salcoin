import { Schema } from 'joi';
import BaseMiddleware from '../schema/base';
import { validateSignup, validateLogin } from '../schema/user';
import { LoggerUtil } from '../util/logger';
import { CodeUtil } from '../util/response-codes';

const validator = (request: any, response: any, next?: (err?: any) => any) => {
  return (methodName: string, schema: Schema): any => {
    const baseMiddleware = new BaseMiddleware(request, schema);
    const message = baseMiddleware.validate();
    if (message) {
      const MethodName = methodName;
      LoggerUtil.error(MethodName, 'UserRequest :', request.body);
      LoggerUtil.error(MethodName, 'Error :', message);
      return response.status(CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST).json({
        code: CodeUtil.HTTP_STATUS_CODE_BAD_REQUEST,
        message,
        status: 'error',
        data: null
      });
    }
    next();
  };
};

export function validateSignupMiddleware(request: any, response: any, next?: (err?: any) => any): any {
  validator(request, response, next)('ValidateSignupMiddleware', validateSignup);
}

export function validateLoginMiddleware(request: any, response: any, next?: (err?: any) => any): any {
  validator(request, response, next)('validateLoginMiddleware', validateLogin);
}
