'use strict';

angular.module('ynabExtensionApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('budget', {
        url: '/budget',
        templateUrl: 'app/budget/budget.html',
        controller: 'BudgetCtrl'
      });
  });
