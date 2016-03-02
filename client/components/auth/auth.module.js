'use strict';

angular.module('ynabExtensionApp.auth', [
  'ynabExtensionApp.constants',
  'ynabExtensionApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
