'use strict';

angular.module('ynabExtensionApp')
  .factory('BankAccount', function ($log, $mdMedia, $mdDialog, $http) {
      // All available bank account types
      var bankAccount = {};

      bankAccount.availableTypes = [
        'Checking',
        'Savings',
        'Credit Card',
        'Cash',
        'Line of Credit'
      ];

      // Default account details
      bankAccount.defaultAccount = {
        name: '',
        description: '',
        type: bankAccount.availableTypes[0],
        active: true,
        transactions: [],
        current: {
          balance: 0,
          unclearedbalance: 0
        }
      };

      bankAccount.getAccounts = function() {
        $log.debug('Adding account ' + account);
        $http.get('/api/accounts')
          .then(function() {
            $log.log('Loaded all bank accounts from server (' + response.data.length + ' found)');
            bankAccount.accounts = response.data;
            socket.syncUpdates('account', $scope.accounts);
          });
      };

      //  $scope.$on('$destroy', function() {
      //    socket.unsyncUpdates('account');
      //  });

      bankAccount.addAccount = function(account) {
        $log.debug('Adding account ' + account);
        return $http.post('/api/accounts/', account)
          .then(function(response) {
            $log.log('Add account successful');
            var status = response.status;
            var accounts = response.data;
          }, function(response) {
            $log.error('Add account failed');
            var status = response.status;
            var accounts = [];
          })
      };

      /**
       * New Account Modal Controller
       */
      function NewAccountCtrl($scope, $mdDialog, $log) {
        $scope.account = bankAccount.defaultAccount;

        $scope.hide = function() {
          $log.debug('Hiding the dialog');
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $log.debug('Cancelling the dialog');
          $mdDialog.cancel();
        };
        $scope.addAccount = function() {
          $log.debug('Submit Button Clicked');

          if ($scope.account) {
            bankAccount.addAccount($scope.account);
            $scope.account = bankAccount.defaultAccount;
            $mdDialog.hide();
          }
        };
      }

      bankAccount.openAddAccountDialog = function(ev) {
        $log.debug('Opening new account modal');
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
        $mdDialog.show({
          controller: NewAccountCtrl,
          templateUrl: 'app/services/new-account/new-account.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        });
      };

      return bankAccount;

    }
  );
