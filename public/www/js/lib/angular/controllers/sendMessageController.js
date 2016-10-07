define([],
function()
{

	return [ '$scope' , 'toaster','sendMessageService','$state','$window',function($scope,toaster,sendMessageService,$state, $window){




$scope.uploadFile=function()
{

//$scope.clearInSessionSignature();

 var f = document.getElementById('uploadMessage').files[0],
      r = new FileReader();
  r.onloadend = function(e){
    var data = e.target.result;

    toaster.pop('success', "Success", "File uploaded Successfully ,TIRACK :"  + $scope.genTirackSeq());

    $scope.setInSessionSignature( $scope.getTirackSeq(),"SIGN1");

    $state.go("msgContentPrev");


     $scope.$msgContentPrev={
                    messageText : data
                    ,tirack : $scope.getTirackSeq()
                    , signature    : $scope.getInSessionSignature( $scope.getTirackSeq())
    };
     $state.go("msgContentPrev",{
     $msgContentPrev: $scope.$msgContentPrev
            });


    alert($scope.getInSessionSignature( $scope.getTirackSeq()));

   ///alert(data);
    //send your binary data via $http or $resource or do anything else with it
  }
  r.readAsBinaryString(f);



  //alert(" I am here for upload");
}
$scope.Submit=function()
{

//$scope.clearInSessionSignature();

 var f = document.getElementById('UploadFile').files[0],
      r = new FileReader();
  r.onloadend = function(e){
    var data = e.target.result;

    toaster.pop('success', "Success", "File uploaded Successfully ,TIRACK :"  + $scope.genTirackSeq());

    $scope.setInSessionSignature( $scope.getTirackSeq(),"SIGN1");

    $state.go("msgContentPrev");


     $scope.$msgContentPrev={
                    messageText : data
                    ,tirack : $scope.getTirackSeq()
                    , signature    : $scope.getInSessionSignature( $scope.getTirackSeq())
    };
     $state.go("msgContentPrev",{
     $msgContentPrev: $scope.$msgContentPrev
            });


    alert($scope.getInSessionSignature( $scope.getTirackSeq()));

   ///alert(data);
    //send your binary data via $http or $resource or do anything else with it
  }
  r.readAsBinaryString(f);



  //alert(" I am here for upload");
}


$scope.genTirackSeq=function()
{

  var TIRACK= parseInt($window.sessionStorage.getItem("TIRACK") );

if (TIRACK == null)
{
  TIRACK=1;
}
else if (TIRACK == "")
{
  TIRACK=1;
}
else if (isNaN(TIRACK))
{
  TIRACK=1;
}
else
{
  TIRACK+=1;
}


//alert(TIRACK);
$window.sessionStorage.setItem("TIRACK",TIRACK) ;
return TIRACK;

}

$scope.getTirackSeq=function()
{

  var TIRACK= parseInt($window.sessionStorage.getItem("TIRACK") );

if (TIRACK == null)
{
  TIRACK=0;
}
else if(TIRACK == "")
{
  TIRACK=0;
}
else if (isNaN(TIRACK))
{
  TIRACK=0;
}
//alert(TIRACK);
$window.sessionStorage.setItem("TIRACK",TIRACK) ;
return TIRACK;

}

$scope.clearInSessionSignature=function()
{
$window.sessionStorage.setItem("SIGNATURE", "[]");
}
$scope.setInSessionSignature=function( tirack,signature)
{

 // alert("setInSessionSignature");

var obj=
{
  "TIRACK" : tirack
  ,"SIGN" : signature 

};

var array=[];



var arrayStr=$window.sessionStorage.getItem("SIGNATURE");

if(arrayStr !=  null)
{
  //alert(arrayStr);
  try
  {
    array= eval(arrayStr);
  }
  catch(e)
  {
    $scope.clearInSessionSignature();
    array=[];

    toaster.pop("error", "Session","Reset");
  }
}

 array.push(obj);
$window.sessionStorage.setItem("SIGNATURE", JSON.stringify(array));

alert($window.sessionStorage.getItem("SIGNATURE"));
}


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



    //alert("sendMessageControler");
$scope.usrId    =     $window.sessionStorage.getItem("usrId"  );
$scope.grpId    =     $window.sessionStorage.getItem("grpId"  );

$scope.$CardDetail=[];
		$scope.login=function()
		{
			alert("login control");
		}




			
//$scope.getUserDetail();

     

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