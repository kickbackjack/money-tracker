'use strict';

describe('Controller: NewAccountCtrl', function () {

  // load the controller's module
  beforeEach(module('moneyBagsApp'));

  var NewAccountCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewAccountCtrl = $controller('NewAccountCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
