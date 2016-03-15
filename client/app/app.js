'use strict';

angular.module('ynabExtensionApp', [
  'ynabExtensionApp.auth',
  'ynabExtensionApp.admin',
  'ynabExtensionApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngMaterial'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
