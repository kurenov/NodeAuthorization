var adminFactory = function ($http) {

  var factory = {};

  factory.getAdminInfo = function () {
    return $http.get('/admin');
  };

  factory.setAdminInfo = function (data) {
    return $http.put({
      url: '/admin/info',
      data: data
    });
  };

  factory.setUserPassword = function (data) {
    return $http.put({
      url: '/admin/password',
      data: data
    });
  };

  return factory;
};

adminFactory.$inject = ['$http'];
angular.module('adminApp').factory('adminFactory', adminFactory);