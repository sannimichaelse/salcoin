import { validateSignup, validateLogin } from '../schema/user';
import { baseMiddleware } from './base-middleware';

export function validateSignupMiddleware(request: any, response: any, next?: (err?: any) => any): any {
  baseMiddleware(request, response, next)('ValidateSignupMiddleware', validateSignup);
}

export function validateLoginMiddleware(request: any, response: any, next?: (err?: any) => any): any {
  baseMiddleware(request, response, next)('validateLoginMiddleware', validateLogin);
}
