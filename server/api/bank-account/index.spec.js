'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bankAccountCtrlStub = {
  index: 'bankAccountCtrl.index',
  show: 'bankAccountCtrl.show',
  create: 'bankAccountCtrl.create',
  update: 'bankAccountCtrl.update',
  destroy: 'bankAccountCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bankAccountIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bank-account.controller': bankAccountCtrlStub
});

describe('BankAccount API Router:', function() {

  it('should return an express router instance', function() {
    bankAccountIndex.should.equal(routerStub);
  });

  describe('GET /api/bank-accounts', function() {

    it('should route to bankAccount.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bankAccountCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/bank-accounts/:id', function() {

    it('should route to bankAccount.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bankAccountCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/bank-accounts', function() {

    it('should route to bankAccount.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bankAccountCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/bank-accounts/:id', function() {

    it('should route to bankAccount.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bankAccountCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bank-accounts/:id', function() {

    it('should route to bankAccount.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bankAccountCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bank-accounts/:id', function() {

    it('should route to bankAccount.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bankAccountCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
