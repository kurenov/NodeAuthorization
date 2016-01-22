/*
 * This file contains CUSTOM made FILTERS
 * by Olzhas Kurenov
 * 
 */

var newLineParser = function() {
  return function(str) {
    var res = str.replace(/[\n\t]/gi,"<br/>");
    return res;
  };
};

newLineParser.$inject = [];
angular.module('mainApp').filter('newlineparser', newLineParser);