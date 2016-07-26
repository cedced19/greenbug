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
              project: $scope.project
            }).success(function (data) {
              $translate('server_added').then(function (translation) {
                notie(1, translation, 3);
                $location.path('/servers/' + data.id).search({title: data.title, token: data.token });
              });
            }).error($rootScope.$error);
          };

        }).error($rootScope.$error);
}];
