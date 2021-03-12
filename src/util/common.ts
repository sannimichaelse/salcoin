/**
 *
 * Common Util
 *
 * * * * * * * * * * * * * * * *
 * @author: Sanni Michael Tomiwa. *
 * * * * * * * * * * * * * * * *
 *
 */

import { LoggerUtil } from './logger';

export class CommonUtil {

    /**
     * convertToTitleCase
     * @param {string} str
     * @return {string}
     */
    public static convertToTitleCase(str: string): string {
      const MethodName = 'convertToTitleCase |';
      LoggerUtil.info(MethodName);

      return str.replace(/\w\S*/g, (txt) => (
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ));
    }

    /**
     * generateUUID
     * @return {string}
     */
    public static generateUUID(): string {
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

}