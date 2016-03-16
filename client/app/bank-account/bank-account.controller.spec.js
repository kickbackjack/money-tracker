'use strict';

describe('Controller: BankAccountCtrl', function () {

  // load the controller's module
  beforeEach(module('ynabExtensionApp'));

  var BankAccountCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BankAccountCtrl = $controller('BankAccountCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
