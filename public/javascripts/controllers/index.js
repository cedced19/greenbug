module.exports = ['$location', '$rootScope', function($location, $rootScope) {
  if ($rootScope.user) {
    return $location.path('/admin/bugs');
  }
}];
