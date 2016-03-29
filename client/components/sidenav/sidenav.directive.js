'use strict';

angular.module('moneyBagsApp')
  .directive('sidenav', () => ({
    templateUrl: 'components/sidenav/sidenav.html',
    restrict: 'E',
    controller: 'SidenavController',
    controllerAs: 'sidenav'
  }));
