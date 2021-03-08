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

import { NotFoundError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createAccount(user: User) {
        return await this.save(user);
    }

    async findByEmail(email: string) {
        const user = await this.findOne({email});
        if (!user) {
            throw new NotFoundError('Wrong email and password combination');
        }

        return user;
    }

}