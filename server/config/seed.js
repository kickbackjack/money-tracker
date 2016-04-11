/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;
var Category = sqldb.Category;
var Transaction = sqldb.Transaction;

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }])
      .then(() => {
        console.log('finished populating users');
      });
  });

Category.sync({force: true})
  .then(() => {
    Category.bulkCreate([{
        name: 'Nice to haves',
        description: 'A group of all things I would like to have but are not essential'
      }])
      .then(() => {
        Category.create({
          name: 'Personal Obligations',
          description: 'A group of all obligations that I must meet each month'
        }).then((category) => {

          // Create new sub-category
          // var subcategory = Category.build({
          //   name: 'Personal Sub Category',
          //   description: 'Personal sub-description'
          // });

          var transaction = Transaction.build({
            datetransaction: Date.now(),
            name: 'My First Transaction',
            description: '',
            cleared: false,
            income: 0,
            outcome: 777,
            externalpayee: 'External'
          });

          // return category.setTransactions(transaction);
        });

        console.log('finished populating categories');
      });
  });
