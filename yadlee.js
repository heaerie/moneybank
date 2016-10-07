 // yadlee.js
 var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var requestIp = require('request-ip');
var useragent = require('useragent');
var geoip = require('geoip-lite');
var cookieParser  = require('cookie-parser');

var device     = require('express-device')
var ms     = require('ms');

var secretkey ="KEY1";
var sessionExpSec =60*15;

var jwt = require('jsonwebtoken');


 Promise = require('bluebird'),
 request = Promise.promisify(require('request'));

 Promise = require('bluebird'),
 request = Promise.promisify(require('request'));

function doRegister(respObj)
{

var cobSessionToken ={};
var userCredentials ={};
var userProfile     ={};
var userPreferences =[];


userProfile ={emailAddress  : "durai145@live.com"
,firstName     :  "FirstName"
,lastName      :  "Test"
,middleInitial :  "M"
,objectInstanceType : "com.yodlee.core.usermanagement.UserProfile"
,address1           : "3600 Bridge Parkway"
,address2           : "Suite 200"
,city               : "Redwood City"
,country            : "USA"
};
  userPreferences=[ "PREFERRED_CURRENCY~USD", "PREFERRED_DATE_FORMAT~MM/dd/yyyy"];



  var req={
    cobSessionToken : respObj
    ,userCredentials: userCredentials
    ,userProfile  :userProfile
    ,userPreferences :userPreferences
  };


var options = {
    method: 'POST',
    uri: 'https://developer.api.yodlee.com/ysl/restserver/v1/cobrand/login',
    form: {  
      req },
    headers: {}
  };


request(options).then(function (resp) {

console.log("Resp");
console.log(resp.body);
doRegister(resp.body);
});



}


function doLogin()
{

  /*
Cobrand login endpoint (POST Method) 
https://developer.api.yodlee.com/ysl/restserver/v1/cobrand/login
Sample Input
cobrandName is passed as path parameter
cobrandLogin and cobrandPassword are passed as form parameters

cobrandName = name of the cobrand
cobrandLogin=<loginName>
cobrandPassword=<password>
  */

  console.log("doLogin");
   var options = {
    method: 'POST',
    uri: 'https://developer.api.yodlee.com/ysl/restserver/v1/cobrand/login',
    form: {  
       cobrandName: "Gangammal Govindaraj"
      ,cobrandLogin : "sbCobgangammal"
      ,cobrandPassword : "314e4d89-86f9-4633-8e16-59bd8f86c64c"

                      },
    headers: {}

                };



console.log(options);
console.log("Requested...");
        request(options).then(function (resp) {

          console.log("Resp");
          console.log(resp.body);
          
          //body: '{"cobrandId":10010352,"applicationId":"3A4CAE9B71A1CCD7FF41F51006E9ED00","locale":"en_US","session":{"cobSession":"08062013_0:1c2eb86ca888f8bb512100e7dccb70bbddc37086932c2c9de6030beefc684e6f48ac0cb3f84f05069a51da9a2d7cae8831f219939aae0c567b7803c5bbd9804b"}}' }

         doRegister(resp.body);

});

console.log("Final");

}


doLogin();
