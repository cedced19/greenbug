module.exports = ['$scope', '$location', '$http', '$rootScope', '$routeParams', '$filter', '$translate', function($scope, $location, $http, $rootScope, $routeParams, $filter, $translate) {

        if (!$rootScope.user) {
          return $location.path('/admin');
        }

        var average = function (array) {
          var total = 0;
          array.forEach(function (value) {
            total += value;
          });
          return total / array.length;
        };

        $http.get('/api/servers/' + $routeParams.id).success(function (data) {
          // Create a chart to show when server is up
          $scope.chartUp = {
            series: [data.title],
            data: [],
            labels: [],
            options: {
                scales: {
                  yAxes: [
                    {
                      display: false
                    }
                  ]
                }
            }
          };
          data.records.forEach(function (value, index) {
            $scope.chartUp.data.push(value.up);
            $scope.chartUp.labels.push($filter('date')(value.createdAt, 'dd/MM HH:mm'));
          });

          // Create a chart to show the average usage of the server's memory
          var freeMemories = data.records.map(function (value) {
            return value.freeMem / value.totalMem;
          });
          $scope.chartMem = {
            data: [],
            labels: []
          };
          $scope.chartMem.data.push(Math.floor(average(freeMemories) * 100));
          $scope.chartMem.data.push(100-$scope.chartMem.data[0]);
          $translate(['free_memory', 'used_memory', 'as_percentage']).then(function (translations) {
            $scope.chartMem.labels.push(translations['free_memory'] + ' ' + translations['as_percentage']);
            $scope.chartMem.labels.push(translations['used_memory'] + ' ' + translations['as_percentage']);
          });
        }).error($rootScope.$error);

}];
