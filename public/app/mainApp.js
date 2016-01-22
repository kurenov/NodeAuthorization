var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(function ($routeProvider) {
  $routeProvider
          .when('/', {
            controller: 'mainController',
            templateUrl: '/app/views/main.html'
          })
          .when('/signup-success', {
            templateUrl: '/app/views/signUpSuccess.html'
          })
          .when('/companies', {
            controller: 'companiesController',
            templateUrl: '/app/views/companies.html'
          })
          .when('/my-companies', {
            controller: 'companyController',
            templateUrl: '/app/views/myCompany.html'
          })
          .when('/under-construction', {
            controller: '',
            templateUrl: '/app/views/authorizeRP.html'
          })
          .otherwise({
            redirectTo: '/under-construction'
          });
});

mainApp.factory('httpRequestInterceptor', function ($window) {
  return {
    request: function (config) {
      var token = $window.localStorage.auth_token;
      if (token) {
        config.headers['x-access-token'] = token;
//        console.log(token);
      }
      return config;
    }
  };
});

mainApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});

var logFactory = function($http) {
  var factory = {};
  
  factory.log = function(data) {
    return $http({
      url:'/api/log',
      method: 'post',
      data: data
    });
  };
  
  return factory;
};

logFactory.$inject = ['$http'];
mainApp.factory('logFactory', logFactory);

var headerController = function($scope, $window, $location, logFactory) {
  $scope.log = function (page) {
    var navigator = {
      language: $window.navigator.language,
      platform: $window.navigator.platform,
      vendor: $window.navigator.vendor
    };
    logFactory.log({page:page,navigator:navigator}).then(
            function successCallback(res) {
            },
            function errorCallback(res) {
            });
  };
  
  $scope.$on('$routeChangeSuccess', function (currentRoute, previousRoute) {
    $scope.log($location.url());
  });
  
};

//headerController.$inject = ['$scope', '$window', '$location', 'logFactory'];
mainApp.controller('headerController', headerController);

var authorizeController = function($scope, $window) {
  
  
  $scope.getAdmin = function() {
    
  }
  
  if (typeof $window.localStorage.auth_token == 'undefined' || $window.localStorage.auth_token == '') {
    $window.location.href = '/authorize';
  }
  else {
    $scope.getAdmin();
  }
  
  
  $scope.logout = function () {
    $window.localStorage.removeItem('auth_token');
    $window.location.href = '/authorize';
  };
  
};
authorizeController.$inject = ['$scope', '$window'];

mainApp.controller('authorizeController', authorizeController);
