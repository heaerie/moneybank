define([],
function()
{

  return [ '$scope' , 'toaster','loginService','$state' ,'$dashboardState' ,'$window',function($scope,toaster,loginService,$state,$dashboardState,$window){

    $scope.login=function()
    {
      alert("login control");
    }

    $scope.uss_submit=function()
      {


           $window.sessionStorage.setItem("firstName"  ,"Money Bank Admin");
            $window.sessionStorage.setItem("grpName"    ,"NA");
            $window.sessionStorage.setItem("firstName"  ,"DURAIMURUGAN");
            $window.sessionStorage.setItem("lastName"   ,"GOVINDARAJ");
            $window.sessionStorage.setItem("prodVersion","1");
            $window.sessionStorage.setItem("prtlName"   ,"Money Bank");
            $window.sessionStorage.setItem("prodName"   , "Luna SP");
            $window.sessionStorage.setItem("usrId"      ,"1");
            $window.sessionStorage.setItem("grpId"      ,"1");



               var   entitlement=  [
                {
                  'link' :'dashboard'
                ,'linkName' :'Home'
                ,'uid' :'dashboard'
                , 'dataType' :'CONTAINER'
                , 'child' : [ 
                    {
                    'link' :'dashboard'
                    ,'linkName' :'Dashboard'
                    ,'uid'  :'dashboard2'
                    , 'dataType' :'NODE'
                    ,'child'  : []
                    }
                    ,
                    {
                    'link' :'sendMessage'

                    ,'linkName' :'Send Message'
                    ,'uid'  :'sendMessage1'
                    , 'dataType' :'NODE'
                    ,'child'  : []
                    }
                    ,
                    {
                    'link' :'SchemaGenerator'

                    ,'linkName' :'SchemaGenerator'
                    ,'uid'  :'SchemaGenerator'
                    , 'dataType' :'NODE'
                    ,'child'  : []
                    }
                     ,
                    {
                    'link' :'signatureVerify'
                    ,'linkName' :'Signature Verify'
                    ,'uid'  :'signatureVerify'
                    , 'dataType' :'NODE'
                    ,'child'  : []
                    }
					,
                    {
                    'link' :'inbox'
                    ,'linkName' :'inbox'
                    ,'uid'  :'inbox'
                    , 'dataType' :'NODE'
                    ,'child'  : []
                    }

                  ]
                }
                         
              ];

          $window.sessionStorage.setItem( "treeViewJson" ,JSON.stringify(entitlement));
         console.log( $window.sessionStorage.getItem("treeViewJson"));

            $state.go('dashboard');
        

       //A alert("I am in uss_submit");
      };
      $scope.uss_auth=function()
      {

        $state.go('signup');

          /*            loginService.authorizeSSO({     "grantType"     : "password" */
          /*loginService.authorizeSSO({     "grantType"     : "password" */
           /*           ,'clientId'    :'CLIENTSP'
                      ,'scope'       : 'GSA'
                      ,'username'    : 'durai145@live.in'
                      ,'password'    : '1qaz2wsx'
                      ,'redirectURI' : 'http://localhost:5000/'

                      },function  (resp) {
          // body...
          console.log(resp);
          toaster.pop('success','this', JSON.stringify(resp));
          //alert('resp');
        }); */

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