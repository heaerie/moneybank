define([],
function()
{

	return [ '$scope' , 'toaster','resultService','$state','$window',function($scope,toaster,resultService,$state, $window){




$scope.callBack=function()
{
	$state.go("signatureVerify");
}

       






         $scope.$watch('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
   // 2 
  // alert('on viewContentLoaded watch');


  $scope.$result = $scope.$result||{};
 

//console.log($state.params);


  $scope.$result=$state.params.$result|| {};

  
//$scope.$MessageContentPreview.tirack ="this";

 
  });







          angular.element(document).ready(function () {
    //alert('page loading completed');
});
	}];
	
});

