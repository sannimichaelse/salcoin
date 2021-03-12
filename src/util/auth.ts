/**
 *
 * Auth Util
 *
 * * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa.   *
 * * * * * * * * * * * * * * * * *
 *
 */
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { SignOptions } from 'jsonwebtoken';
import { ConstantUtil } from './constants';
import { LoggerUtil } from './logger';

export class AuthUtil {

    /**
     * Hash Password
     * @param {string} password
     * @return {any}
     */
    public static hashPassword(password: string): any {
        const MethodName = 'HashPassword |';
        LoggerUtil.info(MethodName, 'password :', password);

        if (!password) {
            return null;
        }

        try {
            return bcrypt.hashSync(password, ConstantUtil.PASSWORD_SALT_ROUNDS);
        } catch (error) {
            return null;
        }
    }

    /**
     * comparePassword
     * @param {string} hashPassword
     * @param {string} password
     * @return {boolean}
     */
    public static comparePassword(password: string, hashPassword: string): boolean {
        const MethodName = 'IsPasswordAndHashPasswordMatch |';
        LoggerUtil.info(MethodName, 'password :', password, '| hashPassword :', hashPassword);

        if (!password || !hashPassword) {
            return false;
        }

        try {
            return bcrypt.compareSync(password, hashPassword);
        } catch (error) {
            LoggerUtil.error(MethodName, 'error :', error);
            return false;
        }
    }

    /**
     * generateAuthToken
     * @param {object} payload
     * @return {string} token
     */
    public static generateAuthToken(payload: any): string {
        const MethodName = 'GenerateAuthToken |';
        LoggerUtil.info(MethodName, 'payload :', payload);

        if (!payload) {
            return null;
        }

        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: ConstantUtil.DEFAULT_AUTH_EXPIRATION
        };

        const token = jwt.sign(payload, ConstantUtil.JWT_AUTH_SECRET_KEY, options);
        return token;
    }

    /**
     * verifyToken
     * @param {string} token
     * @return {Promise<any>}
     */
    public static async verifyToken(token: string): Promise<any> {
        const secretKey = ConstantUtil.JWT_AUTH_SECRET_KEY;
        const MethodName = 'VerifyToken |';
        LoggerUtil.info(MethodName, 'token :', token, '| secretKey :', secretKey);

        if (!token) {
            return null;
        }

        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (error: any, decoded: any) => {
                if (error) {
                    LoggerUtil.info(MethodName, 'error :', error, '| decoded :', decoded);
                    return reject(error);
                }

                LoggerUtil.info(MethodName, ' decoded :', decoded);
                return resolve(decoded);
            });
        });
    }

}