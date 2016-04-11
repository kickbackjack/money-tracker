'use strict';

angular.module('moneyBagsApp')
  .factory('BankAccount', function ($mdMedia, $mdDialog, $http, $log, socket) {
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

      $http.get('/api/bank-accounts')
        .then(response => {
          bankAccount.accounts = response.data;
          socket.syncUpdates('bankAccount', bankAccount.accounts);
        });

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

      bankAccount.addAccount = function(account) {
        $log.debug('Adding account ' + account.name);
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

      bankAccount.getAccountByName = function(account) {
        return account.name === 'Main Account';
      };

      bankAccount.addTransaction = function(accountName, transaction) {
        $log.debug('Adding transaction to ' + accountName);

        var account = bankAccount.accounts.find(bankAccount.getAccountByName);

        if (! account.transactions) {
          account.transactions = [];
        }
        account.transactions.push(transaction);

        $log.log('Transaction below:');
        $log.log(transaction);

        $log.log('Account below:');
        $log.log('Account ID: ' + account._id);
        for (var i = 0; i < account.transactions.length; i++) {
          $log.log(account.transactions[i]);
        }
        $log.log(account);

        return $http.put('/api/bank-accounts/' + account._id, account)
          .then(function(response) {
            $log.log('Add transaction successful');
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

      /**
       * New Account Modal Controller
       */
      function NewTransactionCtrl($scope, $mdDialog, $log) {
        $scope.accounts = bankAccount.accounts;

        $scope.hide = function() {
          $log.debug('Hiding the dialog');
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $log.debug('Cancelling the dialog');
          $mdDialog.cancel();
        };
        $scope.addTransaction = function() {
          $log.debug('Submit button clicked');

          if ($scope.transaction) {


            bankAccount.addTransaction($scope.account.name, $scope.transaction);
            $scope.transaction = {}; // Reset transaction screen
            $mdDialog.hide();
          }
        };
      }

      /**
       * Opens a new account dialog window
       * @param ev
       */
      bankAccount.openAddTransactionDialog = function(ev) {
        $log.debug('Opening "Add Account" dialog');
        $mdDialog.show({
          controller: NewTransactionCtrl,
          templateUrl: 'app/services/bank-account/new-transaction.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: ($mdMedia('sm') || $mdMedia('xs'))
        });
      };

      return bankAccount;

    }
  );
