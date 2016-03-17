'use strict';

angular.module('ynabExtensionApp')
  .factory('BankAccount', function ($log, $mdMedia, $mdDialog, $http, socket) {
      // All available bank account types
      var bankAccount = {};

      bankAccount.accounts = [];

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

      bankAccount.getBankAccounts = function() {
        $log.debug('Getting all accounts');
        $http.get('/api/bank-accounts/')
          .then(function(response) {
            $log.debug('Loaded all bank accounts from server (' + response.data.length + ' found)');
            bankAccount.accounts = response.data;
            socket.syncUpdates('bankAccount', bankAccount.accounts);
          });
      };
      bankAccount.getBankAccounts(); // Execute on initialisation

      bankAccount.addAccount = function(account) {
        $log.debug('Adding account ' + account.name);
        return $http.post('/api/bank-accounts/', account)
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
        $scope.availableTypes = bankAccount.availableTypes;

        $scope.hide = function() {
          $log.debug('Hiding the dialog');
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $log.debug('Cancelling the dialog');
          $mdDialog.cancel();
        };
        $scope.addAccount = function() {
          $log.debug('Submit button clicked');

          if ($scope.account) {
            bankAccount.addAccount($scope.account);
            $scope.account = bankAccount.defaultAccount;
            $mdDialog.hide();
          }
        };
      }

      /**
       * Opens a new account dialog window
       * @param ev
       */
      bankAccount.openAddAccountDialog = function(ev) {
        $log.debug('Opening "Add Account" dialog');
        $mdDialog.show({
          controller: NewAccountCtrl,
          templateUrl: 'app/services/new-account/new-account.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: ($mdMedia('sm') || $mdMedia('xs'))
        });
      };

      return bankAccount;

    }
  );
