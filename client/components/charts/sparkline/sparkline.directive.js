'use strict';

angular.module('moneyBagsApp')
  .directive('sparkline', function ($timeout, $window, $log) {
  	return {
      templateUrl: 'components/charts/sparkline/sparkline.html',
      restrict: 'E',
      link: function postLink(scope, element) {
      	// Generate the c3 chart
      	var chart = c3.generate({
			bindto: '#chart',
			data: {
				columns: [
					['data1', 30, 200, 100, 400, 150, 250],
					['data2', 50, 20, 10, 40, 15, 25]
				],
				types: {
					data1: 'area',
					data2: 'area'
				},
				groups: [['data1', 'data2']]
			},
			axis: {
				x: {
					show: false
				},
				y: {
					show: false
				}
			},
			size: {
				height: 120
			}
		});

      	// Listen on window resize and trigger resizing (redrawing) of chart. Redraws are debounced every 500ms (Prevents over-redrawing) 
		$(window).on("resize.doResize", _.debounce(function (){
			$log.debug('Window resize detected');
		    scope.resizeCharts();
		}, 500));

		/**
		 * Resizes (redraws) the chart to the correct height/width
		 */
		scope.resizeCharts = function() {
			$log.debug('Resizing chart');
			chart.resize();
		}
      }
  	}
  });
