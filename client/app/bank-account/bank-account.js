'use strict';

angular.module('ynabExtensionApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bank-account', {
        url: '/bank-account',
        templateUrl: 'app/bank-account/bank-account.html',
        controller: 'BankAccountCtrl',
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

    //   $stateProvider
    //   .state('bank-account', {
    //   	views: {
    //   		'all': {
				// templateUrl: 'app/bank-account/bank-account.html',
				// controller: 'BankAccountCtrl'
    //   		},
    //   		'detail': {
				// templateUrl: 'app/bank-account/bank-account-all.html'
    //   		}
    //   	}
    //   });
  });
