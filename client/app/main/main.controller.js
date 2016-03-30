'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, BankAccount) {
      //$scope.accounts = BankAccount.accounts;
      //
      //$http.get('/api/bank-accounts')
      //  .then(response => {
      //    $scope.accounts = response.data;
      //    socket.syncUpdates('bankAccount', $scope.accounts);
      //  });
      //
      //$scope.$on('$destroy', function() {
      //  socket.unsyncUpdates('bankAccount');
      //});
      //
      //$scope.addBankAccount = function(account) {
      //  BankAccount.addBankAccount(account);
      //}
    }
  }

  angular.module('moneyBagsApp')
    .controller('MainController', MainController);

})();
