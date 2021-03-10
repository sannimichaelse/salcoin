import * as amqp from 'amqplib/callback_api';
import * as cron from 'node-cron';
import { ConstantUtil } from '../util/constants';
import {
    LoggerUtil
} from '../util/logger';
import TransactionService from './transaction-service';


class TransactionProccessor {

    private queue_url: string;
    private queue_name: string;
    private connection: any;

    constructor() {
        this.queue_url = ConstantUtil.QUEUE_URL;
        this.queue_name = ConstantUtil.QUEUE_NAME;
        this.connection = null;
        this.connect();
    }

    async connect() {
        amqp.connect(this.queue_url, (err, conn) => {
            if (err) {
                LoggerUtil.error('Error from connect');
                this.bail(err);
            }
            this.connection = conn;
        });
    }

    private bail(err: any) {
        const MethodName = 'bail |';
        LoggerUtil.error(MethodName, err);
        console.error(err);
        process.exit(1);
    }

    async addTransactionsToQueue(data: any) {
        const on_open = (err: any, ch: any) => {
            if (err != null) this.bail(err);
            ch.assertQueue(this.queue_name);
            ch.sendToQueue(this.queue_name, Buffer.from(JSON.stringify(data)), {
                persistent: true
            });
            const MethodName = 'addTransactionsToQueue | ';
            LoggerUtil.info(MethodName, 'Successfully added transactions data');
        };
        this.connection.createChannel(on_open);
    }

    async processTransactions() {
        const on_open = async (err: any, ch: any) => {
            if (err != null) this.bail(err);
            ch.assertQueue(this.queue_name);
            ch.consume(this.queue_name, (msg: any) => {
                setTimeout(async () => {
                    const MethodName = 'processTransactions | ';
                    const data = JSON.parse(msg.content.toString());
                    LoggerUtil.info(MethodName, 'Request Body | ', data);
                    await TransactionService.addTransaction(
                        data.request,
                        data.currency_id,
                        data.user_id
                    );
                    ch.ack(msg);
                }, 3000);
            }, {
                noAck: false
            });
        };
        this.connection.createChannel(on_open);
    }

    public async startTransactionWorker() {
        //   * * * * * *
        //   | | | | | |
        //   | | | | | day of week
        //   | | | | month
        //   | | | day of month
        //   | | hour
        //   | minute
        //   second ( optional )
        // Schedule tasks to be run on the server.
        cron.schedule('* * * * *', async () => {
            LoggerUtil.info('Worker running. Checking for transactions in the queue');
            this.processTransactions();
        });
    }

}

export default new TransactionProccessor();