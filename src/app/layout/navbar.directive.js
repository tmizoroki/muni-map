(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('tmNavbar', tmNavbar);

  function tmNavbar() {
    var directive = {
      templateUrl: 'src/app/layout/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {}
    };
    return directive;

  }

  NavbarController.$inject = ['$location']
  function NavbarController($location) {

  }
})();