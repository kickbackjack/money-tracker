'use strict';

angular.module('ynabExtensionApp')
  .directive('transaction', function () {
    return {
      templateUrl: 'app/directives/transaction/transaction.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
