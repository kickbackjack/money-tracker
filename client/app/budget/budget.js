'use strict';

angular.module('moneyBagsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('budget', {
        url: '/budget',
        templateUrl: 'app/budget/budget.html',
        controller: 'BudgetCtrl'
      });
  });
