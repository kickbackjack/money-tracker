'use strict';

describe('Service: bankAccount', function () {

  // load the service's module
  beforeEach(module('moneyBagsApp'));

  // instantiate service
  var bankAccount;
  beforeEach(inject(function (_bankAccount_) {
    bankAccount = _bankAccount_;
  }));

  it('should do something', function () {
    expect(!!bankAccount).toBe(true);
  });

});
