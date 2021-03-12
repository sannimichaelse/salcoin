/**
 *
 * CurrencyRepository
 * Create Update Delete Retrieve
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */

import { NotFoundError } from 'routing-controllers';
import { EntityRepository, Repository } from 'typeorm';
import { Currencies } from '../entity/Currencies';

@EntityRepository(Currencies)
export class CurrencyRepository extends Repository<Currencies> {

    async getCurrency(type: string) {
        const currency = await this.findOne({type});
        if (!currency) {
            throw new NotFoundError('Currency not found');
        }

        return currency;
    }

}