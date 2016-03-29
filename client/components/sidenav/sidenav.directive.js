'use strict';

angular.module('moneyBagsApp')
  .directive('sidenav', () => ({
    templateUrl: 'components/sidenav/sidenav.html',
    restrict: 'E',
    replace: true,
    controller: 'SidenavController',
    controllerAs: 'sidenav'
  }));
