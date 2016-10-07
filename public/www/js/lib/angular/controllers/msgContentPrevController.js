define([],
function()
{

	return [ '$scope' , 'toaster','msgContentPrevService','$state','$window',function($scope,toaster,msgContentPrev,$state, $window){




$scope.callBack=function()
{
	$state.go("sendMessage");
}

       
         $scope.$watch('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
   // 2 
  // alert('on viewContentLoaded watch');


  $scope.$msgContentPrev = $scope.$msgContentPrev||{};
 

//console.log($state.params);


  $scope.$msgContentPrev=$state.params.$msgContentPrev|| {};

  
//$scope.$MessageContentPreview.tirack ="this";

 
  });


          angular.element(document).ready(function () {
    alert('page loading completed');
});
	}];
	
});

