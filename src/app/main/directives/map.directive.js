(function() {
  'use strict';

  angular
    .module('app.main')
    .directive('d3Map', d3Map);

  d3Map.$inject = ['$window', 'd3Service'];

  function d3Map($window, d3Service) {
    var directive = {
      bindToController: true,
      controller: D3MapController,
      controllerAs: 'vm',
      link: link,
      restrict: 'EA',
      scope: {
      }
    };
    return directive;

    function link(scope, element, attrs) {

      d3Service.d3().then(function(d3) {

        //setup variables
        var width = d3.select(element[0]).node().offsetWidth;
        var height = 800;

        var svg = d3.select(element[0])
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);
                    // .style('width', '100%');

        var projection = d3.geo.mercator()
            .center([-122.433701, 37.767683])
            .scale(250000)
            .translate([width / 2, height / 2]);

        //Define default path generator
        var path = d3.geo.path()
           .projection(projection);

        //Browser onresize event
        window.onresize = function() {
          scope.$apply();
        };

        // hard-code data
        scope.data = [];
        
        // Watch for resize event
        scope.$watch(function() {
          return angular.element($window)[0].innerWidth;
        }, function() {
          scope.render(scope.data);
        });
        
        scope.render = function(data) {
          //Load in GeoJSON data
          d3.json("/src/content/geoJSON/neighborhoods.json", function(json) {
            
          //Browserind data and create one path per GeoJSON feature
            svg.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
               .style("fill", "steelblue");
          });

          // remove all previous items before render
          // svg.selectAll('*').remove();
       
          // If we don't pass any data, return out of the element
          // if (!data) return;
       
          // set the height based on the calculations above
          // svg.attr('height', height);
       
          //create the rectangles for the bar chart
          // svg.selectAll('rect')
          //   .data(data).enter()
          //     .append('rect')
          //     .attr('height', barHeight)
          //     .attr('width', 140)
          //     .attr('x', Math.round(margin/2))
          //     .attr('y', function(d,i) {
          //       return i * (barHeight + barPadding);
          //     })
          //     .attr('fill', function(d) { return color(d.score); })
          //     .transition()
          //       .duration(1000)
          //       .attr('width', function(d) {
          //         return xScale(d.score);
          //       });
        }
      });
    }      
  }

  D3MapController.$inject = ['nextbusDataService'];
  function D3MapController(nextbusDataService) {
    var vm = this;

    vm.vehiclesByRoute = {};
    vm.getVehiclesByRoute = getVehiclesByRoute;

    activate();

    function activate() {
      return getVehiclesByRoute().then(function() {
        console.log('Got vehicles')
      });
    }

    function getVehiclesByRoute(route) {
      return nextbusDataService.getVehiclesByRoute()
        .then(function(vehicles) {
          vm.vehiclesByRoute[route] = vehicles;
          return vehiclesByRoute[route];
        })
    }

  }
})();