'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TransactionSchema = new mongoose.Schema({
  datetransaction: { type: Date, default: Date.now },
  datecreated: { type: Date, default: Date.now },
  cleared: Boolean,
  income: Number,
  outcome: Number,
  description: String,
  category: String,
  payee: String
});

var BankAccountSchema = new mongoose.Schema({
  name: String,
  datecreated: { type: Date, default: Date.now },
  description: String,
  type: String,
  active: Boolean,
  transactions: [TransactionSchema],
  current: {
    balance: Number,
    unclearedbalance: Number
  }
});

export default mongoose.model('BankAccount', BankAccountSchema);
 //export default mongoose.model('Transaction', TransactionSchema);
