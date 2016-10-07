define([
    'require'
    ,'angular'
    ,'app'
    ,'jquery'
], function (require, angular,app,$) {
    'use strict';
  var app = angular.module('app', []).config(['$httpProvider' ,'$windows', function($httpProvider,$windows) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

  
/*[
var toasterService=angular.module('toasterService', ['toaster', 'ngAnimate'])
    .controller('myController', function($scope, toaster) {
        $scope.pop = function(){
            toaster.pop('success', "title", "text");
        };
    });
]*/

 /// app.factory('toasterService', toasterService);


  app.controller('formCtrl', function($scope,$http) {
    $scope.master = {email: "John", password: "Doe"};
    $scope.uss_submit = function($scope) {

      //  $scope.user = angular.copy($scope.master);
      //alert("this form submit");
      //toasterService.pop();
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
*/

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


  //  $scope.uss_submit();


});

return app;
});
