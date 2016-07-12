module.exports = ['$scope', '$location', '$http', '$rootScope', 'notie', '$translate', function($scope, $location, $http, $rootScope, notie, $translate) {

        if ($rootScope.user) {
            return $location.path('/admin/bugs');
        }

        $scope.signup = function () {
            $http.post('/api/registrants', {
                email: $scope.email,
                password: $scope.password
            }).success(function() {
                $location.path('/admin/');
                $translate('registrant_created').then(function (translation) {
                  notie.alert(1, translation, 3);
                });
            }).error($rootScope.$error);
        };
}];
