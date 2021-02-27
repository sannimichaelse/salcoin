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
import { ConstantUtil } from './constants';
import { LoggerUtil } from './logger';
import { AuthUtilResponse } from '../interface/response/AuthUtilResponse';
import { reject } from 'lodash';

export class AuthUtil {

    // ----------------------------------------------------------------------
    // Data retrieval section
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    // Module specific section
    // ----------------------------------------------------------------------

    /**
     * Hash Password
     * @param {string} password
     * @return {string} hashedPassword
     */
    public static hashPassword(password: string): string | null {
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
     * IsPasswordAndHashPasswordMatch
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
     * Generate Auth Token
     * @param {object} payload
     * @return {string} token
     */
    public static generateAuthToken(payload: any): string {
        const MethodName = 'GenerateAuthToken |';
        LoggerUtil.info(MethodName, 'payload :', payload);

        if (!payload) {
            return null;
        }

        const token = jwt.sign(payload, ConstantUtil.JWT_AUTH_SECRET_KEY, { expiresIn: '1h' });
        return token;
    }

    /**
     * Verify Token
     * @param {string} token
     * @return {object | null} AuthUtilResponse
     */
    public static async verifyToken(token: string): Promise<any> {
        const secretKey = ConstantUtil.JWT_AUTH_SECRET_KEY;
        const MethodName = 'VerifyToken |';
        LoggerUtil.info(MethodName, 'token :', token, '| secretKey :', secretKey);

        if (!token) {
            return null;
        }

        return new Promise((resolve) => {
            jwt.verify(token, secretKey, (error, decoded: AuthUtilResponse) => {
                if (error) {
                    LoggerUtil.info(MethodName, 'error :', error, '| decoded :', decoded);
                    return reject(error);
                }

                LoggerUtil.info(MethodName, ' decoded :', decoded);
                return resolve(decoded);
            });
        });
    }

    // ----------------------------------------------------------------------
    // Generic method section
    // ----------------------------------------------------------------------

}