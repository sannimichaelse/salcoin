/**
 *
 * User Response
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { User } from '../../entity/User';
import { Response } from '.';

export interface UserResponse extends Response {
    data?: User;
}