var adminLogFactory = function ($http) {

  var factory = {};

  factory.getLog = function () {
    return $http.get('/api/log');
  };

  factory.searchLog = function (data) {
    return $http({
      url: '/api/log/search',
      method: 'post',
      data: data
    });
  };

  return factory;
};

adminLogFactory.$inject = ['$http'];

angular.module('adminApp').factory('adminLogFactory', adminLogFactory);