module.exports = ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope) {

        $http.get('/api/projects').success(function (data) {
                $scope.projects = data;
        }).error($rootScope.$error);
}];
