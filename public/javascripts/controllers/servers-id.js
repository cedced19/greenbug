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
          $scope.server = {
            id: data.id,
            title: data.title
          };

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
            if (value.up) { value.up = 1 } else { value.up = 0 }
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

          // Calculate the last restart
          var lastRecord = data.records[data.records.length-1];
          $scope.lastRestart = $filter('date')(new Date(new Date(lastRecord.createdAt).getTime() - lastRecord.serverUptime*1000), 'dd/MM HH:mm');

          // Calculate the average uptime
          var averageUptime = average(data.records.map(function (value) {
            return value.serverUptime;
          }));
          $translate(['day', 'hour', 'minute', 'days', 'hours', 'minutes']).then(function (translations) {
            var d = Math.floor(averageUptime/86400);
            $scope.averageUptime = d + ' ' + translations['day'+(d>1?'s' : '')];
            averageUptime -= d*86400;

            var h = Math.floor(averageUptime/3600);
            $scope.averageUptime += ' ' + h + ' ' + translations['hour'+(h>1?'s' : '')];
            averageUptime -= h*3600;

            var m = Math.floor(averageUptime/60);
            $scope.averageUptime += ' ' + m + ' ' + translations['minute'+(m>1?'s' : '')];
            averageUptime -= m*60;
          });

        }).error($rootScope.$error);

}];
