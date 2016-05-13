(function() {
  'use strict';

  angular
    .module('app.main')
    .directive('tmSidebar', tmSidebar);

  function tmSidebar() {
    var directive = {
      templateUrl: 'src/app/main/directives/sidebar.html',
      controller: SidebarController,
      controllerAs: 'vm',
      restrict: 'E',
      bindToController: true,
      scope: {
        activeRoutes: '=',
        toggleRoute: '&'
      }
    };

    return directive;
  }

  SidebarController.$inject = ['nextbusDataService'];

  function SidebarController(nextbusDataService) {
    var vm = this;
    vm.routes = [];
    
    activate();

    ////////////////

    function activate() {
      return getRoutes().then(function() {
        console.log('Got routes');
      });
    }

    function getRoutes() {
      return nextbusDataService.getRoutes()
        .then(function(routes) {
          vm.routes = routes;
          return vm.routes;
        })
    }
  }
})();
