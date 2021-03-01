import { validateTransaction } from '../schema/transaction';
import { baseMiddleware } from './base-middleware';

export function validateTransactionMiddleware(request: any, response: any, next?: (err?: any) => any): any {
  baseMiddleware(request, response, next)('validateTransactionMiddleware', validateTransaction);
}