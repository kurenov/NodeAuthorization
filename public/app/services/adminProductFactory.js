var adminProductFactory = function ($http) {

  var factory = {};

  factory.getProduct = function (productId) {
    return $http.get('/api/product/' + productId);
  };

  factory.addProduct = function (data) {
    return $http({
      url: '/admin/product',
      method: 'post',
      data: data
    });
  };

  factory.getProducts = function () {
    return $http({
      url: '/api/products',
      method: 'get'
    });
  };

  factory.searchProducts = function (data) {
    return $http({
      url: '/api/products',
      method: 'post',
      data: data
    });
  };

  factory.getProductsList = function (data) {
    return $http({
      url: '/api/productslist',
      method: 'get',
      data: data
    });
  };
  
  factory.updateProduct = function (data) {
    var id = data._id;
    //delete data._id;
    return $http({
      url: '/admin/product/' +  id,
      method: 'put',
      data: data
    });
  };

  factory.deleteProduct = function (data) {
    return $http({
      url: 'admin/product/' + data,
      method: 'delete'
    });
  };

  return factory;
};

adminProductFactory.$inject = ['$http'];

angular.module('adminApp').factory('adminProductFactory', adminProductFactory);