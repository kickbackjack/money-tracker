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
    'state': 'bank-account/list'
  }];
  //end-non-standard

  constructor(Auth, $scope, $timeout, $mdSidenav, $log, $location, BankAccount) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    $scope.accounts = BankAccount.accounts;

    $scope.$watch(function() {
      return BankAccount.accounts
    }, function(newVal) {
      if (newVal) {
        $log.debug('Accounts list has changed (' + newVal.length + ' found)');
        $scope.accounts = newVal;
      }
    }, true);

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
    $scope.openAddAccountDialog = BankAccount.openAddAccountDialog;
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
