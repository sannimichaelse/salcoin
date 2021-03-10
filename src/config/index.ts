/* eslint-disable no-underscore-dangle */
import * as path from 'path';

import extend from '../util/extend';
import development from './env/development';
import test from './env/test';
import production from './env/production';

const defaults = {
  root: path.normalize(`${__dirname}/..`),
};

const environment = {
  development: extend(development, defaults),
  test: extend(test, defaults),
  production: extend(production, defaults),
}[process.env['NODE' + '_ENV'] || 'development'];

export default environment;
