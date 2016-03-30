/**
 * Budget model events
 */

'use strict';

import {EventEmitter} from 'events';
var Budget = require('../../sqldb').Budget;
var BudgetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BudgetEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Budget.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    BudgetEvents.emit(event + ':' + doc._id, doc);
    BudgetEvents.emit(event, doc);
    done(null);
  }
}

export default BudgetEvents;
