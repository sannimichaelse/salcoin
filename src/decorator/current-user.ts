/**
 *
 * CurrentUserId Decorator
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { Action, createParamDecorator } from 'routing-controllers';
import { AuthUtil } from '../util/auth';

export function CurrentUser() {
    return createParamDecorator({
        value: async (action: Action) => {
            const token = action.request.headers['authorization'];
            const decoded: any = await AuthUtil.verifyToken(token);
            return decoded;
        }
    });
}