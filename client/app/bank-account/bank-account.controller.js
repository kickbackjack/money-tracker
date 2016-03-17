'use strict';

angular.module('ynabExtensionApp')
  .controller('BankAccountCtrl', function ($scope) {

    // TODO: Replace with data received from server
    $scope.transactions = [
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
      }
    ];

    
  });
