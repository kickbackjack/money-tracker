'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];
    this.transactions = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    // Transactions
    $http.get('/api/transactions').then(response => {
      this.transactions = response.data;
      socket.syncUpdates('transaction', this.transactions);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    // Transactions
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('transaction');
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }

  addTransaction() {
    if (this.newTransaction) {
      this.$http.post('/api/transactions', {
        amount: this.transactionForm.amount,
        cleared: this.transactionForm.cleared,
        description: this.transactionForm.description,
        category: this.transactionForm.category,
        payee: this.transactionForm.payee
      });
      this.transactionForm = {};
    }
  }
}

angular.module('ynabExtensionApp')
  .controller('MainController', MainController);

})();
