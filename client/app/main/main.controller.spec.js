'use strict';

describe('Controller: MainController', function() {

  // load the controller's module
  beforeEach(module('moneyBagsApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var MainController;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/bank-accounts')
      .respond([{
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
      }]);

    scope = $rootScope.$new();
    state = $state;
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should attach a list of accounts to the controller', function() {
    $httpBackend.flush();
    expect(MainController.accounts.length).toBe(1);
  });
});
