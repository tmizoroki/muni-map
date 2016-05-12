(function() {
  'use strict';

  angular
    .module('app', [
      //Angular modules
      'ngRoute',

      //Custom modules
      'app.core',
      'app.main',
      'app.layout'
    ]);

})();
