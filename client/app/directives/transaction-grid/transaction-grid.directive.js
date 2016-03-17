'use strict';

angular.module('ynabExtensionApp')
  .directive('transactionGrid', function () {
    return {
      templateUrl: 'app/directives/transaction-grid/transaction-grid.html',
      scope: {
        transactions: '=transactions'
      },
      restrict: 'E',
      link: function (scope, element, attrs) {
      }
    };
  });
