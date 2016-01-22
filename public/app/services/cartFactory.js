var cartFactory = function ($http) {
  
  var factory = {};
  
  factory.getItemsByIds = function(itemIds) {
    return $http({
      url: '/api/cart',
      method: 'post',
      data: itemIds
    });
  };
  
  factory.getCartItems = function() {
    return $http({
      url: '/api/cart',
      method: 'get'
    });
  }
  
  factory.removeCartItem = function(id) {
    return $http({
      url: '/api/cart/'+id,
      method: 'delete'
    });
  }
  
  return factory;
};

cartFactory.$inject = ['$http'];
angular.module('mainApp').factory('cartFactory', cartFactory);