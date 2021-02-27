
import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable-next-line:class-name
export class addTransactionTypes1614432500079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`INSERT INTO currencies(type) VALUES("bitcoin")`);
        await queryRunner.query(`INSERT INTO currencies(type) VALUES("ethereum")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM currencies WHERE type="bitcoin"`);
        await queryRunner.query(`DELETE FROM currencies WHERE type="ethereum"`);
    }

}
