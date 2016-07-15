module.exports = ['$scope', '$location', '$http', '$rootScope', '$routeParams', '$translate', 'notie', 'Upload', function($scope, $location, $http, $rootScope, $routeParams, $translate, notie, Upload) {

      $http.get('/api/projects/' + $routeParams.id).success(function (data) {
              $scope.project = data;

              if ($rootScope.user) {
                $scope.email = $rootScope.user.email;
              }

              var errorCreation = function (res) {
                $scope.uploading = false;
                if (res.status == 401) {
                  $translate('not_an_image').then(function (translation) {
                      notie.alert(3, translation, 3);
                  });
                } else {
                  $translate('error_upload').then(function (translation) {
                      notie.alert(3, translation, 3);
                  });
                }
              };
              var successCreation = function () {
                $translate('bug_shared').then(function (translation) {
                  notie.alert(1, translation, 3);
                  $scope.sharing = false;
                });
              };

              $scope.showForm = function () {
                $scope.sharing = true;
              };

              $scope.shareBug = function () {
                $scope.uploading = true;
                if ($scope.screenshot) {
                  Upload.upload({
                    url: 'api/bugs/',
                    disableProgress: true,
                    data: {
                        screenshot: $scope.screenshot,
                        description: $scope.description,
                        project: $routeParams.id,
                        email: $scope.email
                    }
                  }).then(successCreation, errorCreation);
                } else {
                  $http.post('/api/bugs', {
                    description: $scope.description,
                    project: $routeParams.id,
                    email: $scope.email
                  }).success(successCreation).error(errorCreation);
                }
              };

      }).error(function() {
          $translate('project_doesnt_exist').then(function (translation) {
            notie.alert(2, translation, 3);
            $location.path('/');
          });
      });
}];
