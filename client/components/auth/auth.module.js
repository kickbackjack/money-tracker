'use strict';

angular.module('tmpApp.auth', [
  'tmpApp.constants',
  'tmpApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
