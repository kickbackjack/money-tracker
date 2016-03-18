'use strict';

angular.module('ynabExtensionApp')
  .directive('transactionGrid', function () {
    return {
      templateUrl: 'app/directives/transaction-grid/transaction-grid.html',
      scope: {
        transactions: '=transactions'
      },
      restrict: 'E',
      link: function (scope) {
        scope.selected = [];
        scope.selectedTransactions = scope.transactions;

        scope.query = {
          order: 'name',
          limit: 5,
          page: 1
        };

        function getTransactions(query) {
          scope.promise = transactions.desserts.get(query, success).$promise;
        }

        function success(transactions) {
          scope.selectedTransactions = transactions;
        }

        scope.onPaginate = function (page, limit) {
          getTransactions(angular.extend({}, scope.query, {page: page, limit: limit}));
        };

        scope.onReorder = function (order) {
          getTransactions(angular.extend({}, scope.query, {order: order}));
        };
      }
    };
  });
