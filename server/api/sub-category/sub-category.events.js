/**
 * SubCategory model events
 */

'use strict';

import {EventEmitter} from 'events';
var SubCategory = require('../../sqldb').SubCategory;
var SubCategoryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SubCategoryEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SubCategory.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SubCategoryEvents.emit(event + ':' + doc._id, doc);
    SubCategoryEvents.emit(event, doc);
    done(null);
  }
}

export default SubCategoryEvents;
