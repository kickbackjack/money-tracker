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

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('ynabExtensionApp')
  .controller('NavbarController', NavbarController);
