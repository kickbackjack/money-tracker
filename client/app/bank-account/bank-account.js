'use strict';

angular.module('ynabExtensionApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bank-account', {
        url: '/bank-account',
        templateUrl: 'app/bank-account/bank-account.html',
        controller: 'BankAccountCtrl'
      });
      //.state('bank-account.list', {
      //	url: '/bank-account/all',
      //	templateUrl: 'app/bank-account/bank-account-all.html',
      //	controller: 'BankAccountAllCtrl'
      //});

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
