require('angular'); /*global angular*/
require('angular-route');
require('angular-sanitize');
require('ng-notie');
require('angular-translate');
require('angular-translate-loader-static-files');
require('angular-translate-loader-url');
require('ng-file-upload');
require('angular-local-storage');

var app = angular.module('Greenbug', ['ngNotie', 'ngSanitize', 'ngRoute', 'pascalprecht.translate', 'ngFileUpload', 'LocalStorageModule']);
app.config(['$routeProvider', '$translateProvider', 'localStorageServiceProvider',  function($routeProvider, $translateProvider, localStorageServiceProvider) {
        // Route configuration
        $routeProvider
        .when('/management', {
            templateUrl: '/views/management.html',
            controller: 'GreenbugManagementCtrl'
        })
        .when('/users/new', {
            templateUrl: '/views/users-new.html',
            controller: 'GreenbugUsersNewCtrl'
        })
        .when('/users/:id', {
            templateUrl: '/views/users-id.html',
            controller: 'GreenbugUsersIdCtrl'
        })
        .when('/signup', {
            templateUrl: '/views/signup.html',
            controller: 'GreenbugSignupCtrl'
        })
        .when('/', {
            templateUrl: '/views/login.html',
            controller: 'GreenbugLoginCtrl'
        })
        .when('/languages', {
            templateUrl: '/views/languages.html',
            controller: 'GreenbugLanguagesCtrl'
        })
        .when('/files/new', {
            templateUrl: '/views/files-new.html',
            controller: 'GreenbugFilesNewCtrl'
        })
        .when('/files/:id', {
            templateUrl: '/views/files-id.html',
            controller: 'GreenbugFilesIdCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        // Localstorage configuration
        localStorageServiceProvider.setPrefix('greenbug');

        // i18n configuration
        $translateProvider
        .useStaticFilesLoader({
            prefix: '/langs/locale-',
            suffix: '.json'
        })
        .registerAvailableLanguageKeys(['en', 'fr'], {
          'fr_*': 'fr',
          'en_*': 'en',
       	  '*': 'en'
        })
        .useSanitizeValueStrategy(null)
        .determinePreferredLanguage()
        .fallbackLanguage('en');
}]);
app.run(['$rootScope', '$location', '$http', '$translate', 'notie', 'localStorageService', function ($rootScope, $location, $http, $translate, notie, localStorageService) {

        $rootScope.$on('$routeChangeSuccess', function(event, next, current) { // Close menu
          document.getElementById('checkbox-toggle').checked = false;
        });

        $rootScope.$logout = function () { // Logout function
          $http.get('/logout').success(function () {
            $rootScope.user = false;
            $location.path('/login');
          });
        };

        $rootScope.$goPath = function (path) { // Change path from view
          $location.path(path);
        }

        $rootScope.$error = function () { // Send message error
          $http.get('/authenticated').success(function (data) {
            if (!data.status) {
                $rootScope.user = false;
            }
            $translate('error_occured').then(function (error) {
              notie.alert(3, error , 3);
            });

          }).error(function () {
            $translate('http_error').then(function (error) {
              notie.alert(3, error, 3);
            });
          });
        };

        $http.get('/authenticated').success(function (data) { // Get user informations
          if (data.status) {
              $rootScope.user = data.user;
          } else {
              $rootScope.user = false;
          }
        });

        var lang = localStorageService.get('lang');
        if (lang) {
          $translate.use(lang);
        }
}]);

app.controller('GreenbugManagementCtrl', require('./controllers/management.js'));
app.controller('GreenbugUsersIdCtrl', require('./controllers/users-id.js'));
app.controller('GreenbugUsersNewCtrl', require('./controllers/users-new.js'));
app.controller('GreenbugSignupCtrl', require('./controllers/signup.js'));
app.controller('GreenbugLoginCtrl', require('./controllers/login.js'));
app.controller('GreenbugLanguagesCtrl', require('./controllers/languages.js'));
