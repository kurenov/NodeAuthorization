var authorizeApp = angular.module('authorizeApp', ['ngRoute']);

authorizeApp.config(function ($routeProvider, $httpProvider) {
  $routeProvider
          .when('/', {
            controller: 'authorizeController',
            templateUrl: '/app/views/authorize.html'
          })
          .when('/sign-up', {
            controller: 'authorizeController',
            templateUrl: '/app/views/authorizeSignUp.html'
          })
          .when('/reset-password', {
            controller: 'authorizeController',
            templateUrl: '/app/views/authorizeRP.html'
          })
          .otherwise({redirectTo: '/'});
});

authorizeApp.factory('httpRequestInterceptor', function ($window) {
  return {
    request: function (config) {
      var token = $window.localStorage.admin_token;

      if (token) {
        config.headers['x-admin-token'] = token;
        console.log(token);
      }

      return config;
    }
  };
});

authorizeApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});

var adminFactory = function ($http) {

  var factory = {};

  factory.signIn = function (data) {
    return $http({
      url: '/admin/signin',
      method: 'post',
      data: data
    });
  };

  factory.resetPassword = function (data) {
    return $http({
      url: '/admin/resetpassword',
      method: 'post',
      data: data
    });
  };

  return factory;
};

adminFactory.$inject = ['$http'];
angular.module('authorizeApp').factory('adminFactory', adminFactory);

var authorizeController = function ($scope, $log, adminFactory, $window) {

  $scope.user = {};

  $scope.signin = {
    successMessage: '',
    errorMessage: ''
  };

  $scope.reset = {
    successMessage: '',
    errorMessage: ''
  };

  $scope.signIn = function (user) {
    $scope.signin = {
      successMessage: '',
      errorMessage: ''
    };
    adminFactory.signIn(user)
            .then(function successCallback(response) {
              if (response.data.success) {
                $scope.signin.successMessage = response.data.message;
                $window.localStorage.admin_token = response.data.token;
                $log.log("Token: " + response.data.token);
                $window.location.href = '/admin/';
              }
              else {
                $scope.signin.errorMessage = response.data.message;
                $window.localStorage.removeItem('auth_token');
              }
            }, function errorCallback(response) {
              $scope.signin.errorMessage = "Error: " + response.status + " " + response.statusText + ". ";
              $log.log("Error: " + response.data);
              $log.log("Status: " + response.status);
              $log.log("Status Text: " + response.statusText);
            });
  };

  $scope.resetPassword = function (email) {
    $scope.reset = {
      successMessage: '',
      errorMessage: ''
    };
    adminFactory.resetPassword(email)
            .then(function successCallback(response) {
              if (response.data.success) {
                $scope.reset.successMessage = response.data.message;
                $window.localStorage.auth_token = response.data.token;
                $log.log("Token: " + response.data.token);
                $window.location.href = '/';
              }
              else {
                $scope.reset.errorMessage = response.data.message;
                $window.localStorage.removeItem('auth_token');
              }
            }, function errorCallback(response) {
              $scope.reset.errorMessage = "Error: " + response.status + " " + response.statusText + ". ";
              $log.log("Error: " + response.data);
              $log.log("Status: " + response.status);
              $log.log("Status Text: " + response.statusText);
            });
  };

};

authorizeController.$inject = ['$scope', '$log', 'adminFactory', '$window'];

angular.module('authorizeApp').controller('authorizeController', authorizeController);