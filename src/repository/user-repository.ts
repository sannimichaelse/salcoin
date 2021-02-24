/**
 *
 * User Repository
 * Create Update Delete Retrieve
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {



}