/**
 * BankAccount model events
 */

'use strict';

import {EventEmitter} from 'events';
var BankAccount = require('./bank-account.model');
var BankAccountEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BankAccountEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  BankAccount.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BankAccountEvents.emit(event + ':' + doc._id, doc);
    BankAccountEvents.emit(event, doc);
  }
}

export default BankAccountEvents;
