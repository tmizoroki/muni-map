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
        activeRoutes: "="
      }
    };
    return directive;

    function link(scope, element, attrs) {
      scope.data = {vehicles: {}};

      /**********
       Listen for routeAdded or routeRemoved Events
      **********/

      scope.$on('routeAdded', function(e, route) {
        scope.vm.getVehiclesByRoute(route)
          .then(function(vehicles) {
            scope.vm.vehiclesByRoute[route] = vehicles;
            scope.data.vehicles = scope.vm.vehiclesByRoute;
            console.log('routeAddedData', scope.data.vehicles);
            scope.render(scope.data);
          });
      });

      scope.$on('routeRemoved', function(e, route) {
        delete scope.vm.vehiclesByRoute[route];
        delete scope.data.vehicles[route];
        console.log('routeRemovedData', scope.data.vehicles);
        scope.render(scope.data);
      });

      /**********
        Begin D3
      **********/

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
        
        // Watch for resize event
        scope.$watch(function() {
          return angular.element($window)[0].innerWidth;
        }, function() {
          scope.render(scope.data);
        });

        /**********
          Render
        **********/
        
        scope.render = function(data) {

          // Empty flattenedData array
          var flattenedData = [];

          // If we don't pass any data, return out of the element
          if (!data) return;

          //Load in GeoJSON data
          d3.json("/src/content/geoJSON/neighborhoods.json", function(json) {
            
            //Create one path per GeoJSON feature
            svg.selectAll("path")
             .data(json.features)
             .enter()
             .append("path")
             .attr("d", path)
             .style("fill", "steelblue");
          });

          // Add coordinates property to each vehicle object and push object to flattenedData
          angular.forEach(data.vehicles, function(route) {
            angular.forEach(route, function(vehicle) {
              vehicle.coordinates = projection([vehicle.lon, vehicle.lat]);
              flattenedData.push(vehicle);
            });
          });

          /**********
            Display Vehicle Position
          **********/

          console.log(scope.vm.activeRoutes);

          //Update vehicles
          var vehicleCircles = svg.selectAll('circle')
            .data(flattenedData)
            .attr('cx', function(d) {
              return d.coordinates[0];
            })
            .attr('cy', function(d) {
              return d.coordinates[1];
            })
            .attr('r', 5)
            .style('stroke', function(d) {
              return scope.vm.activeRoutes[d.routeId].color;
            })
            .style('stroke-width', 2)
            .style('fill', 'white');

          //Add vehicles entering the dataset
          vehicleCircles
            .enter()
            .append('circle')
            .attr('cx', function(d) {
              return d.coordinates[0];
            })
            .attr('cy', function(d) {
              return d.coordinates[1];
            })
            .attr('r', 5)
            .style('stroke', function(d) {
              return scope.vm.activeRoutes[d.routeId].color;
            })
            .style('stroke-width', 2)
            .style('fill', 'white');

          //Remove vehicles that have exited the dataset
          vehicleCircles = vehicleCircles.exit().remove();

          /**********
            Display Vehicle ID
          **********/

          // Update vehicle ID text
          var vehicleText = svg.selectAll('text')
            .data(flattenedData)
            .text(function(d) {
              return d.routeId;
            })
            .attr('x', function(d) {
              return d.coordinates[0];
            })
            .attr('y', function(d) {
              return d.coordinates[1] + 4;
            })
            .attr('text-anchor', 'middle')
            .attr('font-size', 8)
            .style('color', function(d) {
              return scope.vm.activeRoutes[d.routeId].textColor;
            });

          // Add text when entering the dataset
          vehicleText
            .enter()
            .append('text')
            .text(function(d) {
              return d.routeId;
            })
            .attr('x', function(d) {
              return d.coordinates[0];
            })
            .attr('y', function(d) {
              return d.coordinates[1] + 4;
            })
            .attr('text-anchor', 'middle')
            .attr('font-size', 8)
            .style('color', function(d) {
              return scope.vm.activeRoutes[d.routeId].textColor;
            });

          // Remove text when exiting the dataset
          vehicleText = vehicleText.exit().remove();
        }
      });
    }
  }

  /**********
    D3 Map Controller
  **********/

  D3MapController.$inject = ['nextbusDataService'];

  function D3MapController(nextbusDataService) {
    var vm = this;

    vm.vehiclesByRoute = {};
    vm.getVehiclesByRoute = getVehiclesByRoute;

    function getVehiclesByRoute(route) {
      return nextbusDataService.getVehiclesByRoute(route)
    }
  }
})();