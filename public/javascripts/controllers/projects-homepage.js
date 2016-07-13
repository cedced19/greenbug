module.exports = ['$scope', '$location', '$http', '$rootScope', '$routeParams', '$translate', 'notie', function($scope, $location, $http, $rootScope, $routeParams, $translate, notie) {

      $http.get('/api/projects/' + $routeParams.project).success(function (data) {
              $scope.project = data;
      }).error(function() {
          $translate('project_doesnt_exist').then(function (translation) {
            notie.alert(2, translation, 3);
            $location.path('/');
          });
      });
}];
