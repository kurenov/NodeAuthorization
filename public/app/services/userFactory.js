var userFactory = function ($http) {

  var factory = {};

  factory.getUserAccountInfo = function () {
    return $http.get('/api/user');;
  };
  
  factory.getUserInfo = function () {
    return $http.get('/api/user/info');
  };
  
  factory.setUserInfo = function (data) {
    return $http.put({
            url:'/api/user/info',
            data: data
          });
  };
  
  factory.setUserPassword = function (data) {
    return $http.put({
            url:'/api/user/password',
            data: data
          });
  };

  return factory;
};

userFactory.$inject = ['$http'];

angular.module('mainApp').factory('userFactory', userFactory);