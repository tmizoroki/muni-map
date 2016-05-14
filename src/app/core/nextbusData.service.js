(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('nextbusDataService', nextbusDataService);

  nextbusDataService.$inject = ['$http', '$q', 'AGENCY'];

  function nextbusDataService($http, $q, AGENCY) {
    var service = {
      getRoutes: getRoutes,
      getRoute: getRoute,
      getVehicles: getVehicles,
      getVehiclesByRoute: getVehiclesByRoute
    };
    return service;

    ////////////////

    function xhrFailed(e, name) {
      var newMessage = 'XHR Failed for ' + name;
      if (e.data && e.data.description) {
        newMessage = newMessage + '\n' + e.data.description;
      }
      e.data.description = newMessage;
      console.error(newMessage);
      return $q.reject(e);
    }

    function getRoutes() {
      return $http.get(['http://localhost:3000','/agencies/', AGENCY, '/routes'].join(''))
        .then(getRoutesComplete)
        .catch(getRoutesFailed);

      function getRoutesComplete(data, status, headers, config) {
        return data.data;
      }

      function getRoutesFailed(e) {
        return xhrFailed(e, 'getRoutes');
      }
    }

    function getRoute(routeId) {
      var url = ['http://localhost:3000','/agencies/', AGENCY, '/routes/', routeId].join('');
      return $http.get(url)
        .then(getRouteComplete)
        .catch(getRouteFailed);

      function getRouteComplete(data, status, headers, config) {
        return data.data;
      }

      function getRouteFailed(e) {
        return xhrFailed(e, 'getRoute');
      }
    }

    function getVehicles() {
      var url = ['http://localhost:3000','/agencies/', AGENCY, '/vehicles'].join('');
      return $http.get(url)
        .then(getVehiclesComplete)
        .catch(getVehiclesFailed);

      function getVehiclesComplete(data, status, headers, config) {
        return data.data;
      }

      function getVehiclesFailed(e) {
        return xhrFailed(e, 'getVehicles');
      }
    }

    function getVehiclesByRoute(routeId) {
      var url = ['http://localhost:3000','/agencies/', AGENCY, '/routes/', routeId, '/vehicles'].join('');
      return $http.get(url)
        .then(getVehiclesByRouteComplete)
        .catch(getVehiclesByRouteFailed);

      function getVehiclesByRouteComplete(data, status, headers, config) {
        return data.data;
      }

      function getVehiclesByRouteFailed(e) {
        return xhrFailed(e, 'getVehiclesByRoute');
      }
    }
  }
})();