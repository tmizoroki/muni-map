(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('nextbusDataService', nextbusDataService);

  nextbusDataService.$inject = ['$http', '$q', 'AGENCY'];

  function nextbusDataService($http, $q, AGENCY) {
    var service = {
      getRoutes: getRoutes,
      getRoute: getRoute
    };
    return service;

    ////////////////

    function getRoutes() {
      return $http.get(['http://localhost:3000','/agencies/', AGENCY, '/routes'].join(''))
        .then(getRoutesComplete)
        .catch(getRoutesFailed);

      function getRoutesComplete(data, status, headers, config) {
        return data.data;
      }

      function getRoutesFailed(e) {
        var newMessage = 'XHR Failed for getRoutes';
        if (e.data && e.data.description) {
          newMessage = newMessage + '\n' + e.data.description;
        }
        e.data.description = newMessage;
        console.error(newMessage);
        return $q.reject(e);
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
        var newMessage = 'XHR Failed for getRoute';
        if (e.data && e.data.description) {
          newMessage = newMessage + '\n' + e.data.description;
        }
        e.data.description = newMessage;
        console.error(newMessage);
        return $q.reject(e);
      }
    }

    // function getVehicles() {
    //   return $http.get(['/agencies/', AGENCY, '/routes'].join(''))
    //     .then(getVehiclesComplete)
    //     .catch(getVehiclesFailed);

    //   function getVehiclesComplete(data, status, headers, config) {
    //     return data;
    //   }

    //   function getVehiclesFailed(e) {
    //     var newMessage = 'XHR Failed for getVehicles';
    //     if (e.data && e.data.description) {
    //       newMessage = newMessage + '\n' + e.data.description;
    //     }
    //     e.data.description = newMessage;
    //     console.error(newMessage);
    //     return $q.reject(e);
    //   }
    // }
  }
})();