angular.module('main', ['ngAnimate', 'toaster'])

.controller('myController', function($scope, toaster, $window) {

    $scope.pop = function(){
        toaster.pop('success', "title", 'message');
       
    };
    
    $scope.goToLink = function(toaster) {
      var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
      if (match) $window.open(match[0]);
      return true;
    };
    
    $scope.clear = function(){
        toaster.clear();
    };
});