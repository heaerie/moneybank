define([],
function()
{

	return [ '$scope' , 'toaster','signupService','$state',function($scope,toaster,signupService,$state){




      // alert("basicDetService");


      $scope.RegisterUser=function()
      {

      
       // alert((JSON.stringify($scope.$register));
        console.log($scope.$register);
        //console.log($scope.$register.fName);
        /**
        email: "abijith@live.in"
fName: "abinith"
lName: "murugan"
password: "1234"
verify: "1212"
        */

        if($scope.$register != undefined)
        {
            if($scope.$register.password == $scope.$register.verify)
            {

               //alert('I m good to proceed');
               $("#verifyErrorBox").text("");
                $( "#verifyErrorBox" ).attr( 'class', ""  );
            }
            else
            {
                $("#verifyErrorBox").text("password and verify are not matched");
                
                $( "#verifyErrorBox" ).attr( 'class', "Error"  );
            }
            signupService.register({     "grantType"     : "password" 
              /*loginService.authorizeSSO({     "grantType"     : "password" */
                          ,'clientId'    :'CLIENTSP'
                          ,'scope'       : 'GSA'
                        //  ,'username'    : $scope.email
                         // ,'password'    : $scope.password
                          ,'redirectURI' : 'http://localhost:5000/'
                          ,'register'     : $scope.$register

                          },function(resp)
                          {

                               toaster.pop('success','this', JSON.stringify(resp));

                          });
      }

        
      }
	
		$scope.basicDetEditSave=function()
    	{


       // console.log($scope);

    			
    		alert('basicDetEditSave :name =' + $scope.name);

        signupService.rigister({     "grantType"     : "password" 
          /*loginService.authorizeSSO({     "grantType"     : "password" */
                      ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                    //  ,'username'    : $scope.email
                     // ,'password'    : $scope.password
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {
          // body...
          //console.log($state);
         // $state.go('dashboard');


          //console.log(resp);
          toaster.pop('success','this', JSON.stringify(resp));

          //alert('resp');
        });


          //basicDetService.save()
    		

    		//alert("I am in uss_submit");
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