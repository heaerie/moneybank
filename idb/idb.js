var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var requestIp = require('request-ip');
var useragent = require('useragent');
var geoip = require('geoip-lite');
var multer  = require('multer');
var log           = require('../libs/log')(module);

var device     = require('express-device');

var app = express();

var https = require('https');
var http = require('http');
var fs = require('fs');

var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'u1021977_admin',
  password : 'india' ,
  database : 'DBHSP'//,
//debug: true
});


function checkpwd(inUsername, inPassword, callback ){
        pool.getConnection(function(err, connection)
        {

                var query='select PROD_NAME , PROD_VERSION , PRTL_NAME, GRP_NAME ,f_name FIRST_NAME, l_name  LAST_NAME,  i.email_id EMAIL  , i.GRP_ID , USR_ID from GID001MB i, GRP001MB g , PRTL002MB prtl ,PROD001MB prod WHERE prtl.prtl_id  = g.prtl_id AND prod.prod_id = prtl.prod_id AND prtl.PRTL_ST =\'ACTIVE\' AND g.grp_id  = i.grp_id AND  i.email_id ='+ connection.escape(inUsername)+' and i.password = '+ connection.escape(inPassword ) + '';

                log.info(query);

                connection.query(query,function(err, rows, fields){
                log.info('in Query');

                        if(err)  callback(false,{"message" : "SYSTEM ERROR" },rows);

                        if ( rows.length ==0 )
                        {
                                log.info('in Query : Nodata Found');

                                rows=[ {
                                "USR_ID":0
                                ,"GRP_ID":0
                                }];

                                callback(false,{"message" : "Invalid Username/Password"},rows);
                        }
                        else
                        {
                                log.info('in Query : Record Found' + rows.length);

                                callback(true,{"message" : "success"},rows);
                        }
                });
		connection.release();

});

}




var chkpwd=0, username="durai145@live.in" ,password ="1qaz2wsx" ;


checkpwd( username,password, function( result,response, record ){

  console.log( 'result:' );
  console.log( result );
  console.log( 'response:' );
  console.log( response );
  console.log( 'record:');
  console.log( record );
});


setTimeout(function() {
 console.log( 'close' );
}, 3000);


function Select(query,values, callback ){
        pool.getConnection(function(err, connection)
        {

                //var query='select PROD_NAME , PROD_VERSION , PRTL_NAME, GRP_NAME ,f_name FIRST_NAME, l_name  LAST_NAME,  i.email_id EMAIL  , i.GRP_ID , USR_ID from GID001MB i, GRP001MB g , PRTL002MB prtl ,PROD001MB prod WHERE prtl.prtl_id  = g.prtl_id AND prod.prod_id = prtl.prod_id AND prtl.PRTL_ST =\'ACTIVE\' AND g.grp_id  = i.grp_id AND  i.email_id ='+ connection.escape(inUsername)+' and i.password = '+ connection.escape(inPassword ) + '';

                log.info(query);

                connection.query(query,values,function(err, rows, fields){
                log.info('in Query');

                        if(err)  callback(false,{"message" : "SYSTEM ERROR" },rows);

                        if ( rows.length ==0 )
                        {
                                log.info('in Query : Nodata Found');

                                rows=[ {
                                "USR_ID":0
                                ,"GRP_ID":0
                                }];

                                callback(false,{"message" : "Invalid Username/Password"},rows);
                        }
                        else
                        {
                                log.info('in Query : Record Found' + rows.length);

                                callback(true,{"message" : "success"},rows);
                        }
                });
		connection.release();

});

}

var query="select * from PROD001MB prod, PRTL002MB prtl ,GRP001MB grp  where prod.PROD_ID= prtl.PROD_ID and grp.PRTL_ID = grp.PRTL_ID and prtl.PRTL_ID = ? ";
var values= [1];

Select( query, values,function(retcode,response,records)
{

	console.log(retcode);
	console.log(response);
	console.log(records);

}
);
