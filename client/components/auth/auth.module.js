'use strict';

angular.module('moneyBagsApp.auth', [
  'moneyBagsApp.constants',
  'moneyBagsApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
