var userFactory = function ($http) {

  var factory = {};

  factory.signIn = function (data) {
    return $http({
      url: '/api/user/signin',
      method: 'post',
      data: data
    });
  };
  
  factory.signUp = function (data) {
    return $http({
      url: '/api/user/signup',
      method: 'post',
      data: data
    });
  };
  
  return factory;
};

userFactory.$inject = ['$http'];

angular.module('authorizeApp').factory('userFactory', userFactory);