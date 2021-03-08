import * as cmd from 'node-cmd';
import Test from '../../src/util/setup-test-tables';

describe('Tear Down', () => {

   before('SETUP [DATABASE]', (done) => {
        console.log('RUNNING MIGRATIONS [TEST] UP');
        cmd.get('npm run typeorm migration:run', (err, data, stderr) => {
            if (err) {
            console.log(err);
            process.exit(1);
            }
            console.log('MIGRATION COMPLETE : UP');
            done();
        });
    });

    it('Should tear down', async () => {
        const test = new Test();
        await test.tearDown();
    });
});