var authorizeController = function ($scope, $log, userFactory, $window) {

  $scope.user = {
    
  };

  $scope.newuser = {
    agree: true
  };

  $scope.signInOAuth = function () {
    var token = document.getElementById('auth_token').value;
    console.log('TOKEN: ', token);
    if (token) {
      $scope.singinError = 'Signed in Via OAuth';
      $window.localStorage.auth_token = token;
      $window.location.href = '/';
    }
  };
  
  $scope.signInOAuth();
  
  $scope.signIn = function (user) {
    userFactory.signIn(user)
            .then(function successCallback(response) {
              if (response.data.success) {
                $scope.singinError = response.data.message;
                $window.localStorage.auth_token = response.data.token;
                $log.log("Token: " + response.data.token);
                $window.location.href = '/';
              }
              else {
                $scope.singinError = response.data.message;
                $window.localStorage.removeItem('auth_token');
              }
            }, function errorCallback(response) {
              $log.log("Error: " + response.data);
              $log.log("Status: " + response.status);
              $log.log("Status Text: " + response.statusText);
            });
  };

  $scope.signUp = function (user) {
    userFactory.signUp(user)
            .then(function successCallback(response) {
              if (response.data.success) {
                $scope.singupError = response.data.message;
                $window.location.href = '/authorize#/';
              }
              else {
                $scope.singupError = response.data.message;
              }
            }, function errorCallback(response) {
              $log.log("Error: " + response.data);
              $log.log("Status: " + response.status);
              $log.log("Status Text: " + response.statusText);
            });
  };
};

authorizeController.$inject = ['$scope', '$log', 'userFactory', '$window'];

angular.module('authorizeApp').controller('authorizeController', authorizeController);