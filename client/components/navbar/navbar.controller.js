'use strict';

class NavbarController {

  //start-non-standard
  menu = [{
    'title': 'Main',
    'state': 'main'
  },
  {
    'title': 'Budget',
    'state': 'budget'
  },
  {
    'title': 'Account',
    'state': 'bank-account'
  }];
  //end-non-standard

  constructor(Auth, $scope, $timeout, $http, $mdSidenav, $log, $location, $mdDialog, $mdMedia, socket, BankAccount) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    $scope.accounts = BankAccount.accounts;


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

    /**
     * Changes the current $location to the specified URI
     */
    function openLink(link) {
      $log.debug('Navigating to ' + link);
      $location.path(link);
    }

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.openLink = openLink;
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
