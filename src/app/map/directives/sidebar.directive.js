(function() {
  'use strict';

  angular
    .module('app.map')
    .directive('tmSidebar', tmSidebar);

  function tmSidebar() {
    var directive = {
      templateUrl: 'src/app/map/directives/sidebar.html',
      controller: SidebarController,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
      }
    };

    return directive;
  }

  function SidebarController() {

  }
})();
