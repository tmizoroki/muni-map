(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['nextbusDataService'];

  function MainController(nextbusDataService) {
    var vm = this;
    vm.title = 'MainController';
    vm.activeRoutes = {};
    vm.toggleRoute = toggleRoute;

    activate();

    ////////////////

    function activate() {
    }

    function toggleRoute(route) {
      route.active = !route.active;
      console.log(route);
      if (route.active) {
        nextbusDataService.getRoute(route.id)
          .then(function(routeConfig) {
            vm.activeRoutes[route.id] = routeConfig;
          })
          .catch(function(err) {
            console.error(err);
          });
      } else {
        delete vm.activeRoutes[route.id];
      }
    }
  }
})();