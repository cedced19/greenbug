module.exports = ['$scope', '$location', '$http', '$rootScope', '$translate', 'notie', function($scope, $location, $http, $rootScope, $translate, notie) {

        if (!$rootScope.user) {
          return $location.path('/');
        }

        $http.get('/api/projects').success(function (data) {

          if (!data.length) {
            $translate('no_project').then(function (translation) {
              notie(2, translation, 7);
              $location.path('/projects/new');
            });
          }

          $scope.projects = data;

          $scope.addServer = function () {
            $http.post('/api/servers', {
              title: $scope.title,
              project: $scope.project.id
            }).success(function (data) {
              $translate('server_added').then(function (translation) {
                notie.alert(1, translation, 3);
                $location.path('/servers/' + data.id).search({password: data.password });
              });
            }).error($rootScope.$error);
          };

        }).error($rootScope.$error);
}];
