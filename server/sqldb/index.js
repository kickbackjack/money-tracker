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
db.Category = db.sequelize.import('../api/category/category.model');
db.Budget = db.sequelize.import('../api/budget/budget.model');
db.Account = db.sequelize.import('../api/account/account.model');
db.Transaction = db.sequelize.import('../api/transaction/transaction.model');
db.User = db.sequelize.import('../api/user/user.model');

export default db;
