(function () {
  'use strict';
  
  angular
    .module('app.main')
    .config(configFunction);
  
  configFunction.$inject = ['$routeProvider'];
  
  function configFunction($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'src/app/main/main.html',
      controller: 'MainController',
      controllerAs: 'vm'
    }); 
  }
  
}());
