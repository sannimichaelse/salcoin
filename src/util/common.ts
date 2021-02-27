/**
 *
 * Common Util
 *
 * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa. *
 * * * * * * * * * * * * * * * *
 *
 */

import { CodeUtil } from './response-codes';
import { ConstantUtil } from './constants';
import { LoggerUtil } from './logger';

export class CommonUtil {

    /**
     * toTitleCase
     * @return {string}
     */
    public static convertToTitleCase(str: string): string {
        const MethodName = 'convertToTitleCase |';
        LoggerUtil.info(MethodName);

      return str.replace(/\w\S*/g, (txt) => (
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ));
    }

}