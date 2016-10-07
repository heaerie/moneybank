define([],
function()
{

	return [ '$scope' , 'toaster','basicDetService','$state' ,'$window',function($scope,toaster,basicDetService,$state,$window){

var ufivalidate=require("ufi.validate");


//$window.sessionStorage.

 var VAL=new ufivalidate.VAL();

//$scope.ErrorBox         =VAL.ErrorBox        ;
$scope.onKeyUp          =VAL.onKeyUp         ;
$scope.onKeyDown        =VAL.onKeyDown       ;
$scope.onKeyPress       =VAL.onKeyPress      ;
$scope.onChange         =VAL.onChange        ;
$scope.valAmount        =VAL.valAmount       ;
$scope.valNumber        =VAL.valNumber       ;
$scope.IsFloate         =VAL.IsFloate        ;
$scope.IsPositiveNumber =VAL.IsPositiveNumber;
$scope.onValidate       =VAL.onValidate      ;
$scope.onClick          =VAL.onClick         ;
$scope.fnValidate       =VAL.fnValidate      ;
/*var ErrorBox         =VAL.ErrorBox        ;
var onKeyUp          =VAL.onKeyUp         ;
var onKeyDown        =VAL.onKeyDown       ;
var onKeyPress       =VAL.onKeyPress      ;
var onChange         =VAL.onChange        ;
var valAmount        =VAL.valAmount       ;
var valNumber        =VAL.valNumber       ;
var IsFloate         =VAL.IsFloate        ;
var IsPositiveNumber =VAL.IsPositiveNumber;
var onValidate       =VAL.onValidate      ;
var onClick          =VAL.onClick         ;
var fnValidate       =VAL.fnValidate      ;
*/

console.log($window.sessionStorage);

 
$scope.basicDetUSSAdd=function()
{

  //alert('Start here');
  $scope.$basicDet=$scope.$basicDet||{};

        basicDetService.Add({     "grantType"     : "password" 
                      ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                      ,'basicDet'   : $scope.$basicDet
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {
 toaster.pop('success','this', JSON.stringify(resp));

        $scope.$basicDet=resp.basicDet;
        $state.params=$scope.$basicDet;
         $state.go(resp.nextState,{
     $basicDet: $scope.$basicDet
            });
        });

}

onClick=   function onClick(obj)
{
 // alert('onClick');
VAL.onClick(obj);

}
onChange=   function onChange(obj)
{
 // alert('onClick');
VAL.onChange(obj);

}
IsPositiveNumber=   function IsPositiveNumber(obj)
{
 // alert('onClick');
VAL.IsPositiveNumber(obj);

}
IsFloate=   function IsFloate(obj)
{
 // alert('onClick');
VAL.IsFloate(obj);

}
valAmount=   function valAmount(obj)
{
 // alert('onClick');
VAL.valAmount(obj);

}
ErrorBox=   function ErrorBox(obj)
{
 // alert('onClick');
VAL.ErrorBox(obj);

}
onKeyDown=   function onKeyDown(obj)
{
 // alert('onKeyDown');
VAL.onKeyDown(obj);

}
onKeyUp=   function onKeyUp(obj)
{
 // alert('onKeyDown');
VAL.onKeyUp(obj);

}

onKeyPress=   function onKeyPress(obj)
{
 // alert('onKeyDown');
VAL.onKeyPress(obj);

}

$scope.$watch('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
   // 2 alert('on viewContentLoaded watch');


   ///console.log($state.params);
//alert('Content Type');



  $scope.$basicDet = $scope.$basicDet||{};
 

//console.log($state.params);


  $scope.$basicDet=$state.params.$basicDet|| {};


   // $scope.getUserDetail();
   // $scope.getCardDetail();
  });

      // alert("basicDetService");
	
		$scope.basicDetEditSave=function()
    	{


        if ($scope.fnValidate() == true )
        {

          alert("Validate success");
        }
        else
        {

          return false;
        //  alert("validate is fail");
        }
        $scope.$basicDet=$scope.$basicDet||{};

        basicDetService.save({     "grantType"     : "password" 
          /*loginService.authorizeSSO({     "grantType"     : "password" */
                      ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                      ,'basicDet'   : $scope.$basicDet
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {
 toaster.pop('success','this', JSON.stringify(resp));

        $scope.$basicDet=resp.basicDet;
        $state.params=$scope.$basicDet;
         $state.go(resp.nextState,{
                        $basicDet: $scope.$basicDet
            });
        });

    	};
    
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