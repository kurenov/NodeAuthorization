var companyFactory = function ($http) {

  var factory = {};

  factory.getCompany = function (companyId) {
    return $http.get('/api/company/'+companyId);
  };

  factory.getCompanies = function () {
    return $http.get('/api/companies');
  };

  factory.getAllCompanies = function () {
    return $http.post('/api/companies');
  };
  
  factory.deleteExistingCompany = function (id) {
    return $http.delete('/api/company/'+id);
  };
  
  factory.getCompaniesList = function (data) {
    return $http({
      url: '/api/companieslist',
      method: 'post',
      data: data
    });
  };
  
  factory.searchCompanies = function (data) {
    return $http({
      url: '/api/companies',
      method: 'post',
      data: data
    });
  };
  
  factory.saveNewCompany = function (data) {
    return $http({
      url: '/api/company',
      method: 'post',
      data: data
    });
  };
  
  factory.saveExistingCompany = function (data) {
    return $http({
      url: '/api/company',
      method: 'put',
      data: data
    });
  };
  
  factory.apply = function (id) {
    console.log('Apply: ' + id);
    return $http({
      url: '/api/company/apply/' + id,
      method: 'get'
    });
  };
  
  factory.cancelApplication = function (id) {
    console.log('cancel: ' + id);
    return $http({
      url: '/api/company/cancelapplication/' + id,
      method: 'get'
    });
  };
  
  factory.leave = function (id) {
    console.log('leave: ' + id);
    return $http({
      url: '/api/company/leave/' + id,
      method: 'get'
    });
  };
  
  
  factory.confirm = function (companyId, userId, groupId) {
    console.log('Confirm: ' + companyId + '-' +userId + ' - ' + groupId);
    return $http({
      url: '/api/company/confirm',
      method: 'post',
      data: {
        companyId:companyId, 
        userId: userId,
        groupId: groupId
      }
    });
  };
  
  factory.revoke = function (companyId, userId) {
    console.log('Revoke: ' + companyId + '-' +userId);
    return $http({
      url: '/api/company/revoke',
      method: 'post',
      data: {
        companyId:companyId, 
        userId: userId
      }
    });
  };
  
  factory.dismiss = function (companyId, userId) {
    console.log('Revoke: ' + companyId + '-' +userId);
    return $http({
      url: '/api/company/dismiss',
      method: 'post',
      data: {
        companyId:companyId, 
        userId: userId
      }
    });
  };
  
  factory.saveGroup = function (companyId, group) {
    console.log('Save Group: ' + companyId);
    return $http({
      url: '/api/company/group/add',
      method: 'post',
      data: {
        companyId:companyId, 
        group: group
      }
    });
  };
  
  factory.removeGroup = function (companyId, groupId) {
    console.log('Removing Group: ' + companyId + '---' +groupId);
    return $http({
      url: '/api/company/group/remove',
      method: 'post',
      data: {
        companyId:companyId, 
        groupId: groupId
      }
    });
  };
  
  factory.changeEmployeeGroup = function (companyId, userId, groupId) {
    return $http({
      url: '/api/company/employee/group',
      method: 'post',
      data: {
        companyId:companyId,
        userId:userId,
        groupId: groupId
      }
    });
  };
  
  
  return factory;
};

companyFactory.$inject = ['$http'];

angular.module('mainApp').factory('companyFactory', companyFactory);