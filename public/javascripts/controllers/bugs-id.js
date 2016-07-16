module.exports = ['$scope', '$location', '$http', '$rootScope', '$routeParams', '$translate', 'notie', function($scope, $location, $http, $rootScope, $routeParams, $translate, notie) {

  if (!$rootScope.user) {
    return $location.path('/');
  }

  $http.get('/api/bugs/' + $routeParams.id).success(function (data) {
        $scope.currentBug = data;

        $scope.editData = function () {
          $http.put('/api/bugs/' + $routeParams.id, {
            description: $scope.currentBug.description
          }).success(function(data) {
            $translate('data_updated').then(function (translation) {
              notie.alert(1, translation, 3);
              $scope.editing = false;
            });
          }).error($rootScope.$error);
        };

        $scope.deleteBug = function () {
          $http.delete('/api/bugs/' + $routeParams.id).success(function(data) {
            $translate('bug_deleted').then(function (translation) {
              notie.alert(1, translation, 3);
              $location.path('/bugs');
            });
          }).error($rootScope.$error);
        };

  }).error($rootScope.$error);
}];
