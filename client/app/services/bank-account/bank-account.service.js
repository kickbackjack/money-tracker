'use strict';

angular.module('ynabExtensionApp')
  .factory('BankAccount', function ($scope) {
  	// All available bank account types
	availableTypes = [
        'Checking',
        'Savings',
        'Credit Card',
        'Cash',
        'Line of Credit'
    ];

    // Default account details
    defaultAccount = {
		name: '',
		description: '',
		type: $scope.availableTypes[0],
		active: true,
		transactions: [],
		current: {
			balance: 0,
			unclearedbalance: 0
		}
	}

	function addAccount(account) {
		$log.debug('Adding account ' + account);
		return $http.post('/api/accounts/', account)
		.then(function(response) {
			$log.log('Add account successful');
			status = response.status;
			accounts = response.data;
		}, function(response) {
			$log.error('Add account failed');
			status = response.status;
			accounts = [];
		})
	}

	/**
     * New Account Modal Controller
     */
    function NewAccountCtrl($scope, $mdDialog, $log, $http) {
      $scope.account = defaultAccount;

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
			addAccount($scope.account);
			$scope.account = defaultAccount;
			$mdDialog.hide();
        }
      };
    }

    $http.get('/api/accounts')
    .then(response => {
      $log.log('Loaded all bank accounts from server (' + response.data.length + ' found)');
      accounts = response.data;
      socket.syncUpdates('account', $scope.accounts);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('account');
    });

  	return {
	    accounts = [];

	    addAccount(account) {
	    	return $http.post('/api/accounts/', account)
	    	.then(function(response) {
	    		$log.log('Add account successful');
	    		status = response.status;
	    		accounts = response.data;
	    	}, function(response) {
	    		$log.error('Add account failed');
	    		status = response.status;
	    		accounts = [];
	    	})
	    }

	    openAddAccountDialog() {
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
		}
  	}
  });
