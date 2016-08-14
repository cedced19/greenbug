module.exports = ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope) {

        if (!$rootScope.user) {
          return $location.path('/admin');
        }

        $http.get('/api/projects/servers').success(function (data) {
            $scope.projects = data;
        });
}];
