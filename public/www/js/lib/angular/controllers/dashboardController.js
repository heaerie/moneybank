define([],
function()
{

	return [ '$scope' , 'toaster','dashboardService','$state','$window',function($scope,toaster,dashboardService,$state, $window){



$scope.usrId    =     $window.sessionStorage.getItem("usrId"  );
$scope.grpId    =     $window.sessionStorage.getItem("grpId"  );

$scope.$CardDetail=[];
		$scope.login=function()
		{
			alert("login control");
		}


$scope.getCardDetail=function()
      {

     // console.log(  $scope.$CardDetail);

        console.log($scope.$CardDetail);
        
          dashboardService.getCardDetail({     "grantType"     : "password" 
                      ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                      ,'usrId'    : $scope.usrId
                      ,'grpId'    : $scope.grpId
                      //,'password'    : $scope.password
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {

          var USS=require("ufi.core").USS;
          var ufiframegen=require("ufi.frameGen");
          var ufivalidate=require("ufi.validate");
          var $=require("jquery");


          var us= new ufiframegen.FG();
          var val= new ufivalidate.VAL();


          var schemaJson=[];



//console.log('resp:');
//console.log(resp);

          schemaJson= resp.schemaJson;
          OutJson= resp.jsonData;

          GenHtmlTemplateFromSJson =USS;




          // alert(GenHtmlTemplateFromSJson);

          var usResource= eval(    "[{" +us.frameGenerationResoure(schemaJson[0].childs,
          schemaJson[0]
          )  +"}]" );


          var  usListVal=eval("[{"+us.frameGenerationListVal(schemaJson[0].childs,
          schemaJson[0]
          )  + "}]"); 

          var func='Y';
          var mode ='VIEW';
          //alert(func);
          var inpUsListVal  = eval("usListVal[0]."+ schemaJson[0].name) ;
          var inpUsResource = eval("usResource[0]."+ schemaJson[0].name) ;
          var inpOutJson    = eval("OutJson[0]."+ schemaJson[0].name) ;
          var ussScript=us.frameGeneration(inpUsListVal
          ,inpUsResource
          ,inpOutJson 
          ,schemaJson[0].childs
          ,schemaJson[0]
          ,0
          ,func
          ,0
          ,mode
          );


          ussScript+="return USSContainer0";
          console.log('-------------ussScript------------');
          console.log(ussScript);

          // try
          {
          var dynFGCall=(new Function("return function(us,val) {" + ussScript + "};"))();

          var appendObj=dynFGCall(us,val);

          console.log('appendObj.innerHTML');
          console.log(appendObj.innerHTML);

          //return "<div> thsis dashboard from heaerieUssServiceProvider </div>";
          document.getElementById('getCardDetailView').innerHTML="";
          document.getElementById('getCardDetailView').appendChild(appendObj);

          }
          }

          );

        //alert("I am in uss_submit");
      };


		$scope.getUserDetail=function()
    	{

        
    			dashboardService.getUserDetail({     "grantType"     : "password" 
    									,'clientId'    :'CLIENTSP'
    									,'scope'       : 'GSA'
                      ,'usrId'    : $scope.usrId
                      ,'grpId'    : $scope.grpId
                      
    									//,'username'    : $scope.email
    									//,'password'    : $scope.password
    									,'redirectURI' : 'http://localhost:5000/'

    									},function  (resp) {

         var USS=require("ufi.core").USS;
   var ufiframegen=require("ufi.frameGen");
   var ufivalidate=require("ufi.validate");
   var $=require("jquery");


   var us= new ufiframegen.FG();
   var val= new ufivalidate.VAL();


var schemaJson=[];



console.log('resp:');
console.log(resp);

schemaJson= resp.schemaJson;
OutJson= resp.jsonData;

    GenHtmlTemplateFromSJson =USS;

    


   // alert(GenHtmlTemplateFromSJson);

   var usResource= eval(    "[{" +us.frameGenerationResoure(schemaJson[0].childs,
  schemaJson[0]
)  +"}]" );


var  usListVal=eval("[{"+us.frameGenerationListVal(schemaJson[0].childs,
    schemaJson[0]
)  + "}]"); 

var func='Y';
var mode ='VIEW';
//alert(func);
var inpUsListVal  = eval("usListVal[0]."+ schemaJson[0].name) ;
var inpUsResource = eval("usResource[0]."+ schemaJson[0].name) ;
var inpOutJson    = eval("OutJson[0]."+ schemaJson[0].name) ;
var ussScript=us.frameGeneration(inpUsListVal
                                              ,inpUsResource
                                              ,inpOutJson 
                                              ,schemaJson[0].childs
                                              ,schemaJson[0]
                                              ,0
                                              ,func
                                              ,0
                                              ,mode
                                          );


  ussScript+="return USSContainer0";
    console.log('-------------ussScript------------');
    console.log(ussScript);

   // try
    {
      var dynFGCall=(new Function("return function(us,val) {" + ussScript + "};"))();
   
      var appendObj=dynFGCall(us,val);

       console.log('appendObj.innerHTML');
      console.log(appendObj.innerHTML);

      //return "<div> thsis dashboard from heaerieUssServiceProvider </div>";
      document.getElementById('getUserDetailView').innerHTML="";
    document.getElementById('getUserDetailView').appendChild(appendObj);
     
    }


        ///// end

    			//console.log(resp);
    		//	toaster.pop('success','this', JSON.stringify(resp));

    			//alert('resp');
    		}

        );

    		//alert("I am in uss_submit");
    	};
    	
//$scope.getUserDetail();

      $scope.uss_auth=function()
    	{
    			loginService.authorizeSSO({     "grantType"     : "password"
    			/*loginService.authorizeSSO({     "grantType"     : "password" */
    									,'clientId'    :'CLIENTSP'
    									,'scope'       : 'GSA'
    									,'username'    : 'durai145@live.in'
    									,'password'    : '1qaz2wsx'
    									,'redirectURI' : 'http://localhost:5000/'

    									},function  (resp) {
    			// body...
    			console.log(resp);
    			toaster.pop('success','this', JSON.stringify(resp));
    			//alert('resp');
    		});



       

    		//alert("I am in uss_submit");
    	};

         $scope.$watch('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
   // 2 alert('on viewContentLoaded watch');
    //$scope.getUserDetail();
    //$scope.getCardDetail();
  });

         /* $scope.$on('$viewChangeSuccess', function(){
    //Here your view content is fully loaded !!
    alert('on viewContentLoaded');
    //$scope.getUserDetail();
  });*/


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