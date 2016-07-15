module.exports = ['$scope', '$location', '$http', '$rootScope', '$translate', 'notie', function($scope, $location, $http, $rootScope, $translate, notie) {

        if (!$rootScope.user) {
          return $location.path('/');
        }

        $scope.addProject = function () {
          $http.post('/api/projects', {
            title: $scope.title,
            description: $scope.description
          }).success(function (data) {
            $translate('project_created').then(function (translation) {
              notie(1, translation, 3);
              $location.path('/' + data.id);
            });
          }).error($rootScope.$error);
        };
}];
