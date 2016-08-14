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
        .when('/', {
            templateUrl: '/views/login.html',
            controller: 'GreenbugLoginCtrl'
        })
        .when('/projects/new', {
            templateUrl: '/views/projects-new.html',
            controller: 'GreenbugProjectsNewCtrl'
        })
        .when('/servers', {
            templateUrl: '/views/servers-list.html',
            controller: 'GreenbugServersListCtrl'
        })
        .when('/servers/new', {
            templateUrl: '/views/servers-new.html',
            controller: 'GreenbugServersNewCtrl'
        })
        .when('/bugs', {
            templateUrl: '/views/bugs-list.html',
            controller: 'GreenbugBugsListCtrl'
        })
        .when('/bugs/:id', {
            templateUrl: '/views/bugs-id.html',
            controller: 'GreenbugBugsIdCtrl'
        })
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
        .when('/projects/:id', {
            templateUrl: '/views/projects-homepage.html',
            controller: 'GreenbugProjectsHomepageCtrl'
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
        };

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

        $rootScope.$languageMenu = {
          value : $translate.preferredLanguage(),
          hidden: true,
          toggle: function () {
            if (this.hidden) {
              document.getElementById('languages-menu').style.display = 'block';
              this.hidden = false;
            } else {
              document.getElementById('languages-menu').style.display = 'none';
              this.hidden = true;
            }
          },
          change: function (lang) {
            $translate.use(lang);
            localStorageService.set('lang', lang);
            this.value = lang;
            this.toggle();
          }
        };

        var lang = localStorageService.get('lang');
        if (lang) {
          $translate.use(lang);
          $rootScope.$languageMenu.value = lang;
        }
}]);

app.controller('GreenbugManagementCtrl', require('./controllers/management.js'));
app.controller('GreenbugUsersIdCtrl', require('./controllers/users-id.js'));
app.controller('GreenbugUsersNewCtrl', require('./controllers/users-new.js'));
app.controller('GreenbugBugsListCtrl', require('./controllers/bugs-list.js'));
app.controller('GreenbugBugsIdCtrl', require('./controllers/bugs-id.js'));
app.controller('GreenbugProjectsHomepageCtrl', require('./controllers/projects-homepage.js'));
app.controller('GreenbugProjectsNewCtrl', require('./controllers/projects-new.js'));
app.controller('GreenbugServersNewCtrl', require('./controllers/servers-new.js'));
app.controller('GreenbugServersListCtrl', require('./controllers/servers-list.js'));
app.controller('GreenbugSignupCtrl', require('./controllers/signup.js'));
app.controller('GreenbugLoginCtrl', require('./controllers/login.js'));
