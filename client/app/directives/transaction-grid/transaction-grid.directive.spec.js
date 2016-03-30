'use strict';

describe('Directive: transactionGrid', function () {

  // load the directive's module and view
  beforeEach(module('moneyBagsApp'));
  beforeEach(module('app/directives/transaction-grid/transaction-grid.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<transaction-grid></transaction-grid>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the transactionGrid directive');
  }));
});
