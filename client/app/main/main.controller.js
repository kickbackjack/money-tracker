'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, BankAccount) {
    this.$http = $http;
    this.accounts = [];

    $http.get('/api/bank-accounts').then(response => {
      this.accounts = response.data;
      socket.syncUpdates('bank-account', this.accounts);
    })

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('bank-account');
    });

    addBankAccount(account) {
      BankAccount.addBankAccount(account);
    }
  }
}

angular.module('ynabExtensionApp')
  .controller('MainController', MainController);

})();
