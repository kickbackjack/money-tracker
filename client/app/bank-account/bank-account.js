'use strict';

angular.module('ynabExtensionApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bank-account', {
        url: '/bank-account',
        templateUrl: 'app/bank-account/bank-account.html',
        controller: 'BankAccountCtrl'
      });
  });
