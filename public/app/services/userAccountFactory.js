var userAccountFactory = function ($http) {

  var factory = {};
  
  factory.log = function(data) {
    return $http({
      url:'/api/log',
      method: 'post',
      data: data
    });
  };
  
  factory.getUserAccountInfo = function () {
    return $http.get('/api/user');
  };
  
  factory.getUserInfo = function () {
    return $http.get('/api/user/info');
  };
  
  factory.setUserInfo = function (data) {
    return $http({
            url:'/api/user/info',
            method: 'put',
            data: data
          });
  };
  
  factory.setUserPassword = function (data) {
    return $http({
            url:'/api/user/password',
            method: 'put',
            data: data
          });
  };
  
  factory.saveNewAddress = function (data) {
    delete data._id;
    return $http({
            url:'/api/user/address',
            method: 'post',
            data: data
          });
  };
  
  factory.saveExistingAddress = function (data) {
    return $http({
            url:'/api/user/address/' + data._id,
            method: 'put',
            data: data
          });
  };
  
  factory.deleteExistingAddress = function (addressId) {
    return $http({
            url:'/api/user/address/' + addressId,
            method: 'delete'
          });
  };
  
  factory.subscribeUser = function (email) {
    return $http({
            url:'/api/subscribe/' + email,
            method: 'post'
          });
  };

  return factory;
};

userAccountFactory.$inject = ['$http'];

angular.module('mainApp').factory('userAccountFactory', userAccountFactory);