'use strict';

angular.module('moneyBagsApp')
  .directive('transactionGrid', function (BankAccount) {
    return {
      templateUrl: 'app/directives/transaction-grid/transaction-grid.html',
      scope: {
        transactions: '=transactions'
      },
      restrict: 'E',
      link: function (scope) {
        scope.selected = [];

        scope.query = {
          order: 'payee',
          limit: 5,
          page: 1
        };

        scope.transactions = [
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
          }];

        function getTransactions(query) {
          scope.promise = scope.transactions.get(query, success).$promise;
        }

        function success(transactions) {
          scope.transactions = transactions;
        }

        scope.onPaginate = function (page, limit) {
          getTransactions(angular.extend({}, scope.query, {page: page, limit: limit}));
        };

        scope.onReorder = function (order) {
          getTransactions(angular.extend({}, scope.query, {order: order}));
        };

        scope.addTransaction = function (ev) {
          BankAccount.openAddTransactionDialog(ev);
        }
      }
    };
  });
