/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var NavbarComponent = function() {
  this.navbar = element(by.css('.navbar'));
  this.navbarHeader = this.navbar.element(by.css('.sidenav-header'));
  this.navbarNav = this.navbar.element(by.css('#sidenav-main .nav.sidenav-nav:not(.sidenav-right)'));
  this.navbarAccount = this.navbar.element(by.css('#sidenav-main .nav.sidenav-nav.sidenav-right'));
  this.navbarAccountGreeting = this.navbarAccount.element(by.binding('getCurrentUser().name'));
};

module.exports = new NavbarComponent();
