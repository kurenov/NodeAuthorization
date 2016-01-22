/*
 * This file contains CUSTOM made DIRECTIVES
 * by Olzhas Kurenov
 * 
 */

//Custom Directive displaying rating using stars
var productRatingDirective = function () {
  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      rating: '='
    },
    template: '<span>Invalid Rating</span>',
    link: function (scope, element, attributes) {
      var elemHtml = '';

      scope.$watch('rating', function (n,o) {
        if (scope.rating >= 0) {
          for (var i = 1; i <= 5; i++) {
            //full stars
            if (i < scope.rating) {
              elemHtml += '<img src="images/star_full.png" width="20" height="24">';
            }
            //half star
            else if (Math.ceil(scope.rating) == i) {
              if (scope.rating - Math.floor(scope.rating) >= 0.5) {
                elemHtml += '<img src="images/star_full.png" width="20" height="24">';
              }
              else {
                elemHtml += '<img src="images/star_half.png" width="20" height="24">';
              }
            }
            //empty stars
            else {
              elemHtml += '<img src="images/star_empty.png" width="20" height="24">';
            }
          }

          element.html(elemHtml);
        }
      }, true);
    }
  };
};

angular.module('mainApp').directive('productRating', productRatingDirective);

