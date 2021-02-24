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
import { ConstantUtil } from '../util/constants';
import { LoggerUtil } from '../util/logger';

export function CurrentUserId() {
    return createParamDecorator({
        value: async (action: Action) => {
            let currentUserId = ConstantUtil.DEFAULT_CURRENT_USER_ID;

            const authorization = action.request.headers['authorization'];

            if (authorization) {
                const splittedAuthorization = authorization.split(ConstantUtil.AUTHORIZATION_HEADER_PREFIX);

                if (splittedAuthorization.length > 1) {
                    const token = splittedAuthorization[1];
                    const decoded: any = await AuthUtil.verifyToken(token, ConstantUtil.JWT_AUTH_SECRET_KEY);

                    if (decoded) {
                        currentUserId = decoded.id;
                    }
                }
            }

            return currentUserId;
        }
    });
}