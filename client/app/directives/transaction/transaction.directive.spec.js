'use strict';

describe('Directive: transaction', function () {

  // load the directive's module and view
  beforeEach(module('ynabExtensionApp'));
  beforeEach(module('app/directives/transaction/transaction.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<transaction></transaction>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the transaction directive');
  }));
});
