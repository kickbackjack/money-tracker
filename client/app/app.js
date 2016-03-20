'use strict';

angular.module('moneyBagsApp', [
  'moneyBagsApp.auth',
  'moneyBagsApp.admin',
  'moneyBagsApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngMaterial',
  'md.data.table'
])
  .config(function($urlRouterProvider, $locationProvider, $mdIconProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    $mdIconProvider
      .icon('menu', 'bower_components/material-design-icons/navigation/svg/production/ic_menu_24px.svg', 24)
      .icon('minimise', 'bower_components/material-design-icons/navigation/svg/production/ic_arrow_back_24px.svg', 24)
      .icon('close', 'bower_components/material-design-icons/navigation/svg/production/ic_close_24px.svg', 24)
      .icon('add', 'bower_components/material-design-icons/content/svg/production/ic_add_circle_24px.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  });
