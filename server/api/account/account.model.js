'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AccountSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  active: Boolean,
  transactions: [{
  	datecreated: { type: Date, default: Date.now },
  	cleared: Boolean,
  	amount: Number,
  	description: String,
  	category: String
  }],
  current: {
  	balance: Number,
  	unclearedbalance: Number
  }
});

export default mongoose.model('Account', AccountSchema);
