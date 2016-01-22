var orderFactory = function ($http, $log) {

  var factory = {};

  factory.getOrder = function (order) {
    $log.log("Create User Factory: " + order);
    return $http({
      url: '/getOrder/',
      method: 'post',
      data: order
    });
  };

  return factory;
};

orderFactory.$inject = ['$http', '$log'];

angular.module('checkoutApp').factory('orderFactory', orderFactory);