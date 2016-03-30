/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Account = db.sequelize.import('../api/account/account.model');
db.Transaction = db.sequelize.import('../api/transaction/transaction.model');
db.User = db.sequelize.import('../api/user/user.model');

export default db;
