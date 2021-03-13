/**
 *
 * Constant Util
 *
 * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa. *
 * * * * * * * * * * * * * * * *
 *
 */
import config from '../config/index';

export const ConstantUtil = {

    EXISTING_USER_ID: 1,

    DEFAULT_CURRENT_USER_ID: 0,

    AUTHORIZATION_HEADER_PREFIX: 'Bearer ',

    // Config
    APP_NAME: config.APP_NAME,

    // Postgres Config
    MYSQL_HOST: config.MYSQL_HOST,
    MYSQL_PORT: Number(config.MYSQL_PORT),
    MYSQL_DATABASE: config.MYSQL_DATABASE,
    MYSQL_USERNAME: config.MYSQL_USERNAME,
    MYSQL_PASSWORD: config.MYSQL_PASSWORD,

    // JWT | Token Config
    PASSWORD_SALT_ROUNDS: 10,
    JWT_AUTH_SECRET_KEY: config.JWT_AUTH_SECRET_KEY,
    JWT_RESET_PASSWORD_SECRET_KEY: config.JWT_RESET_PASSWORD_SECRET_KEY,
    DEFAULT_AUTH_EXPIRATION: '1h',
    DEFAULT_EMAIL_TOKEN_EXPIRATION: null,
    DEFAULT_RESET_PASSWORD_TOKEN_EXPIRATION: null,

    // Password
    PASSWORD_MIN_LENGTH: 8,

    // New user status
    ACTIVE: 1,
    INACTIVE: 0,

    // Transaction status
    PENDING: 'pending',
    COMPLETED: 'completed',

    // Queue
    QUEUE_URL : config.QUEUE_URL,
    QUEUE_NAME: 'transactions',

    // Transaction - 1B
    TRANSACTION_LIMIT: 1000000000


};