'use strict';

class NavbarController {

  //start-non-standard
  menu = [{
    'title': 'Account',
    'state': 'main'
  },
  {
    'title': 'Budget',
    'state': 'budget'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $scope, $timeout, $mdSidenav, $log) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug('Sidebar toggle is done');
          });
      }, 200);
    }

    $scope.toggleLeft = buildDelayedToggler('left');
  }
}

class LeftCtrl {
  constructor($scope, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug('Closing Left Navigation Bar');
        });
    };
  }
}

angular.module('ynabExtensionApp')
  .controller('NavbarController', NavbarController)
  .controller('LeftCtrl', LeftCtrl);
