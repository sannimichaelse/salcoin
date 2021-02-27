import { Schema } from 'joi';
import SchemaValidator from '../schema/base';
import { LoggerUtil } from '../util/logger';
import { CodeUtil } from '../util/response-codes';

export const baseMiddleware = (request: any, response: any, next?: (err?: any) => any) => {
  return (methodName: string, schema: Schema): any => {
    const baseMiddleware = new SchemaValidator(request, schema);
    const message = baseMiddleware.validate();
    if (message) {
      const MethodName = methodName;
      LoggerUtil.error(MethodName, ' | Request :', request.body, ' | Error :', message);
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