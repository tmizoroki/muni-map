(function () {
  'use strict';
  
  angular
    .module('app.map')
    .config(configFunction);
  
  configFunction.$inject = ['$routeProvider'];
  
  function configFunction($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'src/app/map/map.html'
    }); 
  }
  
}());
