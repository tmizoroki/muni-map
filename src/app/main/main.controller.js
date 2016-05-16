(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'nextbusDataService'];

  function MainController($scope, nextbusDataService) {
    var vm = this;
    vm.title = 'MainController';
    vm.activeRoutes = {};
    vm.toggleRoute = toggleRoute;

    activate();

    ////////////////

    function activate() {
    }

    function coordsToGeoJSON(routeConfig) {
      var features = _.map(routeConfig.paths, function(path) {
        var geometry = _.map(path, function(line) {
          var coordinates = _.map(line, function(coord) {
            return [coord.lon, coord.lat];
          });
          var geometry = {
            type: "LineString",
            coordinates: coordinates
          };
          return geometry;
        });

        var feature = {
          type: "Feature",
          geometry: geometry[0]
        };
        return feature;
      });

      routeConfig.features = {
        type: "FeatureCollection",
        features: features
      };
      delete routeConfig.paths;
      return routeConfig;
    }

    function toggleRoute(route) {
      route.active = !route.active;
      if (route.active) {
        nextbusDataService.getRoute(route.id)
          .then(function(routeConfig) {
            return coordsToGeoJSON(routeConfig);
          })
          .then(function(modifiedRoute) {
            console.log('modifiedRoute', modifiedRoute)
            vm.activeRoutes[route.id] = modifiedRoute;
          })
          .then(function() {
            $scope.$broadcast('routeAdded', route.id);
          })
          .catch(function(err) {
            console.error(err);
          });
      } else {
        delete vm.activeRoutes[route.id];
        $scope.$broadcast('routeRemoved', route.id);
      }
    }
  }
})();