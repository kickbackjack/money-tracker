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
  .config(function($urlRouterProvider, $locationProvider, $mdIconProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    $mdIconProvider
      .icon('menu', 'bower_components/material-design-icons/navigation/svg/production/ic_menu_24px.svg', 24)
      .icon('minimise', 'bower_components/material-design-icons/navigation/svg/production/ic_arrow_back_24px.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  });
