import { validateWallet } from '../schema/wallet';
import { baseMiddleware } from './base-middleware';

export function validateWalletMiddleware(request: any, response: any, next?: (err?: any) => any): any {
  baseMiddleware(request, response, next)('validateWalletMiddleware', validateWallet);
}