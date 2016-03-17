'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BankAccountSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  active: Boolean,
  transactions: [{
    datecreated: { type: Date, default: Date.now },
    cleared: Boolean,
    income: Number,
    outcome: Number,
    description: String,
    category: String,
    payee: String
  }],
  current: {
    balance: Number,
    unclearedbalance: Number
  }
});

export default mongoose.model('BankAccount', BankAccountSchema);
