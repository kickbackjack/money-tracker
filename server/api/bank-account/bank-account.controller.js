/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bank-accounts              ->  index
 * POST    /api/bank-accounts              ->  create
 * GET     /api/bank-accounts/:id          ->  show
 * PUT     /api/bank-accounts/:id          ->  update
 * DELETE  /api/bank-accounts/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import BankAccount from './bank-account.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of BankAccounts
export function index(req, res) {
  BankAccount.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single BankAccount from the DB
export function show(req, res) {
  BankAccount.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new BankAccount in the DB
export function create(req, res) {
  BankAccount.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing BankAccount in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  BankAccount.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a BankAccount from the DB
export function destroy(req, res) {
  BankAccount.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
