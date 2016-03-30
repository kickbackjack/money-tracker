'use strict';

angular.module('moneyBagsApp')
  .controller('BankAccountCtrl', function ($scope, $log, BankAccount) {

    $scope.accounts = [];
    $scope.selectedAccount = [];
    $scope.allAccountTransactions = [];
    $scope.selectedAccountTransactions = [];

    $scope.$watch(function() {
      return BankAccount.accounts
    }, function(newVal) {
      if (newVal) {
        $log.debug('Accounts list has changed (' + newVal.length + ' found)');
        $scope.accounts = newVal;
      }
    }, true);

    // TODO: Replace with data received from server
    //$scope.transactions = [
    //  {
    //    datecreated: new Date(),
    //    cleared: false,
    //    income: 1900.00,
    //    outcome: 0,
    //    description: 'Salary',
    //    category: 'Income',
    //    payee: 'Work'
    //  },
    //  {
    //    datecreated: new Date(),
    //    cleared: false,
    //    income: 0,
    //    outcome: 1140.00,
    //    description: 'Big Payment',
    //    category: 'Mortgage',
    //    payee: 'Mortgage Company'
    //  }
    //];


  });
