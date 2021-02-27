
import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable-next-line:class-name
export class addCurrencies1614421911557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`INSERT INTO transaction_types(name) VALUES("transfer")`);
        await queryRunner.query(`INSERT INTO transaction_types(name) VALUES("fund_wallet")`);
        await queryRunner.query(`INSERT INTO transaction_types(name) VALUES("withdrawal")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM transaction_types WHERE name="transfer"`);
        await queryRunner.query(`DELETE FROM transaction_types WHERE name="fund_wallet"`);
        await queryRunner.query(`DELETE FROM transaction_types WHERE name="withdrawal"`);
    }

}
