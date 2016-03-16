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
  //end-non-standard

  constructor(Auth, $scope, $timeout, $http, $mdSidenav, $log, $location, $mdDialog, $mdMedia, socket) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.accounts = [];

    // Load / Sync Accounts accross
    $http.get('/api/accounts').then(response => {
      $log.log('Loaded all bank accounts from server (' + response.data.length + ' found)');
      this.accounts = response.data;
      socket.syncUpdates('accounts', this.accounts);
    });

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

    /**
     * New Account Modal Controller
     */
    function NewAccountCtrl($scope, $mdDialog, $log) {
      $scope.availableTypes = [
          'Checking',
          'Savings',
          'Credit Card',
          'Cash',
          'Line of Credit'
      ];
      
      $scope.hide = function() {
        $log.debug('Hiding the dialog');
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $log.debug('Cancelling the dialog');
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $log.debug('Answering the dialog');
        $mdDialog.hide(answer);
      };
    }

    function openNewAccountModal(ev) {
      $log.debug('Opening new account modal');

      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        controller: NewAccountCtrl,
        templateUrl: 'app/new-account/new-account.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      });
    }

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.openLink = openLink;
    $scope.openNewAccountModal = openNewAccountModal;
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
