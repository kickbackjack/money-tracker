/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import BankAccount from '../api/bank-account/bank-account.model';

User.find({}).removeAsync()
  .then(() => {
  User.createAsync({
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
  })
  .then(() => {
  console.log('finished populating users');
});
});

BankAccount.find({}).removeAsync()
  .then(() => {
  BankAccount.createAsync({
  name: 'Main Account',
  description: 'This is my main bank account',
  type: 'Checking',
  active: true,
  transactions: [
    {
      datecreated: new Date(),
      cleared: false,
      income: 1900.00,
      outcome: 0,
      description: 'Salary',
      category: 'Income',
      payee: 'Work'
    },
    {
      datecreated: new Date(),
      cleared: false,
      income: 0,
      outcome: 1140.00,
      description: 'Big Payment',
      category: 'Mortgage',
      payee: 'Mortgage Company'
    }],
  current: {
    balance: 760.00,
    unclearedbalance: 760.00
  }
});
});
