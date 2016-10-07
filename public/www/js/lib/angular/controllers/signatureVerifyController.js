define([],
function()
{

	return [ '$scope' , 'toaster','signatureVerifyService','$state','$window',function($scope,toaster,signatureVerifyService,$state, $window){


$scope.getInSessionSignature=function( tirack)
{


var array=[];



var arrayStr=$window.sessionStorage.getItem("SIGNATURE");

alert(arrayStr);
if(arrayStr !=  null)
{
  array= eval(arrayStr);
}

// array.push(obj);
//$window.sessionStorage.setItem("SIGNATURE", JSON.stringify(obj));

for(var i =0; i< array.length; i++)
{
  if(array[i].TIRACK == tirack)
  {
      return array[i].SIGN;

  }
}



return "";

}


$scope.Submit=function()
{

$scope.$signatureVerify= $scope.$signatureVerify||{}
  toaster.pop('success', "title", "text");

var  prevSignature=$scope.getInSessionSignature( $scope.$signatureVerify.tirack||"");

 $scope.$result={

 TIRACK: $scope.$signatureVerify.tirack||"",
    signature    : prevSignature

 };

 $state.go("result", {$result: $scope.$result});
}

$scope.uploadFile=function()
{

  alert(" I am here for upload");
}

   

         $scope.$watch('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
   // 2 alert('on viewContentLoaded watch');
 
  });

       

          angular.element(document).ready(function () {
   // 1 alert('page loading completed');
});
	}];
	
});

/*[

 toasterService.pop('success', "title", "text");
      var url = "/authorize"; 
      var config =  { 
          headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIZWFlcmllIEdTTCIsImF1ZCI6Ind3dy5teXJvb21leHBlbnNlLmNvbSIsImlhdCI6IjYwbXMifQ.G37Yj8ljUjbOf-kSyc4j3-YAlbseb1KET9CMBgbJfaE"
           ,'Authorization': 'Basic dGVzdDp0ZXN0'
            ,      'Content-Type': 'application/x-www-form-urlencoded'
            ,'Access-Control-Allow-Origin': false

            
        }
      };
      var dataJson = 
      {
        "email" : "durai145@live.in"
        ,"password" : "1qaz2wsx"
        ,"grantType": "password"
            ,"clientId" : "CLIENTSP"
            ,"scope" : "GSA"
            ,"redirectURI" :"http://localhost:5000"
      };

    /*
    $.post(url , dataJson , function (resp,status,xhr){

        alert("resp" + status);

    },dataType);


  $http.post(url,dataJson,config).then(function (response) 
    { 
     // alert("resp");
      console.log(response);
      alert(JSON.stringify(response));
    },function(data){

      if(data.status == 302)
      {

        alert("Invalid request");
      }
     });
    };

]*/