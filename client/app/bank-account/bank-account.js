'use strict';

angular.module('moneyBagsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bank-account', {
        url: '/bank-account',
        templateUrl: 'app/bank-account/bank-account.html',
        controller: 'BankAccountCtrl'
        // abstract: true
      })
      .state('bank-account.list', {
      	url: '/list',
      	templateUrl: 'app/bank-account/bank-account.list.html'
      })
      .state('bank-account.detail', {
      	url: '/:id',
      	templateUrl: 'app/bank-account/bank-account.detail.html'
      });
  });
