'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var budgetCtrlStub = {
  index: 'budgetCtrl.index',
  show: 'budgetCtrl.show',
  create: 'budgetCtrl.create',
  update: 'budgetCtrl.update',
  destroy: 'budgetCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var budgetIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './budget.controller': budgetCtrlStub
});

describe('Budget API Router:', function() {

  it('should return an express router instance', function() {
    budgetIndex.should.equal(routerStub);
  });

  describe('GET /api/budgets', function() {

    it('should route to budget.controller.index', function() {
      routerStub.get
        .withArgs('/', 'budgetCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/budgets/:id', function() {

    it('should route to budget.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'budgetCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/budgets', function() {

    it('should route to budget.controller.create', function() {
      routerStub.post
        .withArgs('/', 'budgetCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/budgets/:id', function() {

    it('should route to budget.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'budgetCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/budgets/:id', function() {

    it('should route to budget.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'budgetCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/budgets/:id', function() {

    it('should route to budget.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'budgetCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
