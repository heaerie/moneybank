var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var requestIp = require('request-ip');
var useragent = require('useragent');
var geoip = require('geoip-lite');
var cookieParser  = require('cookie-parser');

var device     = require('express-device');


var jwt = require('jsonwebtoken');


var app = express();

var https = require('https');
var http = require('http');
var fs = require('fs');

var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'u1021977_admin',
  password : 'india' ,
  database : 'DBHSP'
});

/*--- Invoke DB --*/

var idb=require('./idb/InvokeDB');
var uss=require('./idb/USS_10');


var log                 = require('./libs/log')(module);
/*[]
app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

*/

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
	
});
	
}


function getGroupNav(usr_id, callback )
{

	log.info('getGroupNav');
pool.getConnection(function(err, connection) {

var query='select gid.USR_ID , rolem.ROLE_NAME  ,rapg.PRTL_PAGE_GRP_ID ,pggr.PAGE_GRP_TITLE ,PAGE_GRP_KEY '
 + ' from '
 + ' DBHSP.GID001MB  gid     ,'
 + ' DBHSP.MEMA001MB mema    ,'
 + ' DBHSP.ROLA003MB rolem   ,'
 + ' DBHSP.RAPG004LB rapg    ,'
 + ' DBHSP.PGGR005MB  pggr'
 + ' where gid.USR_ID             = mema.USR_ID '
 + ' and   rolem.ROLE_ID          = mema.ROLE_ID'
 + ' and   rapg.PRTL_PAGE_GRP_ID  = pggr.PRTL_PAGE_GRP_ID'
 + ' and   gid.USR_ID             = ' + connection.escape(usr_id) +' '
 + ' and   rapg.ACCESS_IND        = \'Y\' '
//var query='select distinct gid.USR_ID,rapgl.ROLE_ID ,PAGE_GRP_TITLE ,PAGE_GRP_KEY ,pggr.PAGE_GRP_ID  from DBHSP.MEMA001MB mem , DBHSP.GID001MB  gid  , DBHSP.RAPG004LB rapgl, DBHSP.PGGR005MB pggr where gid.usr_id  = mem.usr_id and   rapgl.ROLE_ID = mem.ROLE_ID and   rapgl.PRTL_PAGE_GRP_ID = rapgl.PRTL_PAGE_GRP_ID and  gid.USR_ID =' + connection.escape(usr_id) +'' ;

log.info(query);

var queryRslt=connection.query(query,function(err, rows, fields) {

	if(err)  callback(false,{"message" : err},rows);
	
	if ( rows.length ==0 )
	{
		callback(false,{"message" : "Access Denied"},rows);
	}
	else
	{
		callback(true,{"message" : "success"},rows);
	}
});
connection.release();

});
	
}
var chkpwd=0, username="durai145@live.in" ,password ="1qaz2wsx" ; 


checkpwd( username,password, function( result,response, record ){

  console.log( "Return:" +result );
  console.log( "Response:" +response );
//  console.log( "record:" + record );
});

    
// setup sample data - wouldn't actually use this in production




//setTimeout(function() {
 //   mongoose.disconnect();
//}, 3000);
//app.use(bodyParser.urlencoded);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(device.capture());
app.set('view options', { layout: true });
device.enableViewRouting(app);
app.use(cookieParser());
app.use(session({secret: 'glbladmin',
resave: false,
saveUninitialized: true
}));
var sess ;
console.log(new Date());

/*

app.all('*', function(req, res, next)
{

var agent = useragent.parse(req.headers['user-agent']);
var geo = geoip.lookup(requestIp.getClientIp(req));
//agent.os.toString(); // 'Mac OSX 10.8.1'

var browser ="";
if( useragent.is(req.headers['user-agent']).chrome == true)
{
	browser ="CHROME";
}
else if( useragent.is(req.headers['user-agent']).firefox == true)
{
	browser +="FIREFOX";
}
else if( useragent.is(req.headers['user-agent']).ie  == true)
{
	browser +="IE";
}
else if( useragent.is(req.headers['user-agent']).mobile_safari  == true)
{
	browser +="MOBILE_SAFARI";
}
else if( useragent.is(req.headers['user-agent']).mozilla  == true)
{
	browser +="MOZILLA";
}
else if( useragent.is(req.headers['user-agent']).opera  == true)
{
	browser +="OPERA";
}
else if( useragent.is(req.headers['user-agent']).safari  == true)
{
	browser +="SAFARI";
}
else if( useragent.is(req.headers['user-agent']).webkit  == true)
{
	browser +="WEBKIT";
}
else if( useragent.is(req.headers['user-agent']).android  == true)
{
	browser +="ANDROID";
}
browser += " " + useragent.is(req.headers['user-agent']).version;


//console.log("BROWSER = " +  browser);
//console.log("OS      = " + agent.os.toString());
//console.log("Device  = " + agent.device.toString());
if ( geo == null)
{

	geo={
		country:'NA'
		,city:'NA'
		,region:'NA'
	   };
}



var BrowserInfo=
{
 BRWSR_NAME 		: browser
,DEVICE 		: agent.device.toString()
,OS 			: agent.os.toString()
,LOGIN_DATE 		: ''
,LOGOUT_DATE 		: ''
,LOGIN_STATUS 		: ''
,LOGIN_DESRC 		: ''
,CLIENT_IP 		: requestIp.getClientIp(req) 
,CLIENT_HOST 		: requestIp.getClientIp(req)
,GEO_COUNTRY 		: geo.country
,LANG 			: ''
,USR_ID 		: ''
,GRP_ID 		: ''
,PROD_ID 		: ''
,GEO_CITY 		: geo.city
,GEO_DTL 		: req.headers['user-agent']
,GEO_REGION 		: geo.region
};

res.locals.BrowserInfo  = BrowserInfo;
		fs.readFile('jsonSchema/PersonalInfo1.json', function(err, data)
		{

			console.log("--Read Schema Data----");
			console.log(JSON.parse(data));
			res.locals.PersonalInfo = JSON.parse(data);
			//console.log('In * locals');
			//console.log('res.locals.PersonalInfo=' + res.locals.PersonalInfo );
			//console.log('res.locals.BrowserInfo ='  + res.locals.BrowserInfo );
		}); 




		next();

});   

*/ 

function insertLogin(BrowserInfo)
{


var now = new Date();
var jsonDate = now.toJSON();
var then = new Date(jsonDate);


BrowserInfo.MKR_ID= BrowserInfo.USR_ID;
BrowserInfo.ATH_ID= BrowserInfo.USR_ID;
BrowserInfo.LOGIN_DATE= then;
BrowserInfo.DT_CREATED= then;
BrowserInfo.DT_MODIFIED= then;

	console.log( 'INSERT INTO LOGIN HIST TABLE' + BrowserInfo);
	pool.getConnection(function(err, connection) 
	{
		connection.query('INSERT INTO DBHSP.LGNL001HT SET ?', BrowserInfo, function(err, result) 
		{
		  if (err) throw err;
		  console.log(result.insertId);
		});
		connection.release();

	});
	

}



// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});
app.post('/GenTool/GenJson_21.html' , function(req,res) {

res.redirect('GenTool/GenJson_21.html');

}
);





app.post('/glbladmin/page/:id' , function(req,res) {
	console.log( req.body );
	//req.params.id

	console.log('in POST : /glbladmin/page/'  + req.params.id );
	console.log( '---req--- ');
	console.log( req);
	console.log( '---req.body--- ');
	console.log( req.body );
	console.log( '---req.body.XMLJson--- ');
	console.log(req.body.XMLJson);
	var XMLJson=req.body.XMLJson;
	if(req.body.XMLJson === undefined )
	{
		XMLJson=req.body.XMLJson;
	}
	console.log( '---XMLJson--- ');
	console.log(XMLJson);
	console.log( '---req.session--- ');
	console.log( req.session );
	

	sess=req.session;

	if  ( req.session  === undefined )
	{

		req.session={email : ""};
		console.log('No session' );
		res.redirect('glbladmin/pages/login.html');
	}
	else
	{
		try
		{
			if ( ! req.session.email  )
			{
				
				checkpwd( req.body.email,req.body.password, function( result,response, logindata ){

					  console.log( "Return:" +result );
					  console.log( "Response:" +response.message );
					  console.log( "record:" + logindata );

				//	res.locals.BrowserInfo.USR_ID       =  logindata[0].USR_ID;
				//	res.locals.BrowserInfo.GRP_ID       =  logindata[0].GRP_ID;
				//	res.locals.BrowserInfo.LOGIN_STATUS =  (result == true ) ? "SUCCESS" : "FAILED";
				//	res.locals.BrowserInfo.LOGIN_DESRC  =  response.message;
				//	insertLogin( res.locals.BrowserInfo );


					if ( result  ==  false  )
					{

						//res.render('login.ejs', { error : response.message });
						console.log( '---req.body---------');
						console.log( req.body);
						console.log( '---req.body---------');
							if(PersonalInfo=== undefined)
							{
								PersonalInfo="";
							}
								var session= { PersonalInfo : PersonalInfo, idb : idb, uss: uss };
								res.render('index.ejs', { session : session });
					}
					else
					{

						log.info('call getGroupNav ');
						log.info('inparm  logindata ' + logindata.length);
						console.log( logindata);
						console.log( '---req.body---------');
						console.log( req.body);
						console.log( '---req.body---------');

					
						getGroupNav( logindata[0].USR_ID, function (result,response, grpdata  ) 
						{
							log.info('in getGroupNav ');
							if( result ) 
							{
								var pageId=1;
								var pageType='NAVI';
								var SchemaJson=res.locals.PersonalInfo;
								var DataJson=req.body;


								log.info('in getGroupNav success');
								console.log( "Return:" +result );
								console.log( "Response:" +response.message );
								console.log( "record:" + grpdata );	
								sess.email= req.body.email;
								PersonalInfo = res.locals.PersonalInfo;
								sess.login=  logindata[0];
								PersonalInfo.login = logindata[0];
								PersonalInfo.curr_page_id = req.params.id;
								PersonalInfo.MainNav = grpdata;
								sess.MainNav= grpdata;
								var session= { PersonalInfo : PersonalInfo, idb : idb, uss: uss, XMLJson : XMLJson };
								res.render('index.ejs', { session : session });
							}
							else
							{
								log.info('in getGroupNav fail');
								sess.email= req.body.email;
								PersonalInfo = res.locals.PersonalInfo;
								sess.login= logindata[0] ;
								PersonalInfo.login = logindata[0];
								res.render('denied.ejs', {PersonalInfo : PersonalInfo });
							}
						});
					}
				});
			}
		}
		catch(e)
		{
			req.session={email:""};

		}

		if (  req.session.email  )
		{
				console.log('check session.email' );
				console.log('In session.email' );
			if ( req.session.login )
			{
				PersonalInfo = res.locals.PersonalInfo;
				PersonalInfo.login = req.session.login;
				PersonalInfo.MainNav = req.session.MainNav;
				PersonalInfo.curr_page_id = req.params.id;
				var session= { PersonalInfo : PersonalInfo, idb : idb, uss: uss,XMLJson : XMLJson };
				res.render('index.ejs', { session : session });
			}
		}


}
});



app.get('/',function(req,res){
console.log("line : 48" );
console.log("line : 49" + res);

console.log('Session='+  req.session );
if  ( req.session  === undefined )
{

	req.session={email : ""};
console.log('No session' );
	res.redirect('glbladmin/pages/login.html');
}
else
{

	try
	{
		if ( ! req.session.email  )
		{
			res.redirect('glbladmin/pages/login.html');
		}
	}
	catch(e)
	{
		req.session={email:""};

	}
		if (  req.session.email  )
		{
console.log('check session.email' );
console.log('In session.email' );
			if ( req.session.login )
			{
				res.redirect('glbladmin/page/dashboard');
			}
		}


}
});


app.post('/login_01',function(req,res){
sess=req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
sess.email=req.body.email;
res.end('done');
});

app.post('/login',function(req,res){


console.log( "login get" );
sess=req.session;
if(sess.email)
{
res.write(' <h1>Hello '+sess.email+'</h1> ');
res.end('<a href="#">Logout</a>');
}
else
{
		console.log( req );
	if( req.body.email != null  )
	{
		res.write('<h1>successfull login.</h1> ');
		sess.email=req.body.email;
	}
	else
	{
		res.write('<h1>Please login first.</h1> ');
		res.end('<a href="/">Login</a>');
	}
}

});

/*[
app.post('/glbladmin/service/Religion', function(req, res){
  console.log("#######Religion########");
  console.log(req);
  console.log(req.params);
  console.log(req.body);
  console.log(req.USRID);
  res.send('<select class="ctext" name="' + req.params.id + '" +> <option> --none-- </option>  <option>' + req.params.id  + '</option> </select>' );
});

]*/
app.post('/glbladmin/service/:id', function(req, res){

/*[
{ USRID: '1',
  GROUPID: '1',
  class: 'ctext',
  name: 'Religion',
  xml: 'N',
  mndf: 'N',
  datatype: 'VARCHAR',
  htmltype: 'DIV',
  id: 'religion',
  errorbox: 'religionErrorBox',
  label: 'Religion',
  title: '',
  onchange: 'onChange(this)',
  onclick: 'onClick(this)',
  onblure: 'undefined',
  onkeydown: 'onKeyDown(this)',
  onkeyup: 'onKeyUp(this)',
  onkeypress: 'onKeyPress(this)',
  task: 'NONE' }

]*/

//  console.log(req.body.USRID);

var respStr= '<select      class="ctext '+ req.body.class      + '" '
                +'        xml="'+ req.body.xml        + '" ' 
                +'       mndf="'+ req.body.mndf       + '" '
                +'   datatype="'+ "LIST"  + '" '
                +'   htmltype="'+ req.body.htmltype   + '" '
                +'         id="'+ req.body.name       + '" '
                +'   errorbox="'+ req.body.name +"ErrorBox"   + '" '
                +'      label="'+ req.body.label      + '" '
                +'      title="'+ req.body.title      + '" '
                +'   onchange="'+ req.body.onchange   + '" '
                +'    onclick="'+ req.body.onclick    + '" '
                +'    onblure="'+ req.body.onblure    + '" '
                +'  onkeydown="'+ req.body.onkeydown  + '" '
                +'    onkeyup="'+ req.body.onkeyup    + '" '
                +' onkeypress="'+ req.body.onkeypress + '" '
                +'       task="'+ req.body.task       + '" >'
                +' <option value=""    id="'+req.body.name+'"> </option>' 
                +' <option value="1"    id="'+req.body.name+'"> '+ req.body.name+'</option>' 
                +' </select>';
	res.send(respStr);

});


app.get('/glbladmin/pages/logout',function(req,res){
req.session.destroy(function(err){
if(err){
console.log(err);
}
else
{
res.redirect('/');
}
});
});
app.get('/logout',function(req,res){
req.session.destroy(function(err){
if(err){
console.log(err);
}
else
{
res.redirect('/');
}
});
});

app.post('/myws',function(req, res){
	console.log(req.body);	
	res.send('['+req.body['filename']+']');
	res.sendFile(__dirname+'/mids/'+req.body.filename);
});

app.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});

///token start




function validInput(req,res,callback)
{


	req.getHeader=function(arg)
	{

		var retVal="";
		try
		{
			retVal=req.headers[arg]
		}
		catch(e)
		{

			retVal="";
		}
		return retVal;

	}

	req.getParam = function(arg)
	{
		var retVal="";
		if(req.method == "POST")
		{
			try
			{
				retVal=req.params[arg] || req.body[arg]  ;	
			}
			catch(e)
			{
				retVal="";
			}
			
		}
		else if (req.method == "GET")
		{

			try
			{
				retVal=req.query[arg]  || req.body[arg];	
			}
			catch(e)
			{
				retVal="";
			}

		}
		return retVal;
	}


	//var contentType = response.getHeader('content-type');

	console.log(req);
   var accessToken=	req.getHeader("x-access-token");

   var grantType=req.getParam("grantType");
   var clientId=req.getParam("clientId");
   var scope=req.getParam("scope");

   var respObj= {
   	 respCode : 0
   	,respDescr :""
   	,accessToken :accessToken
   	,userName    :""
   	,error : ""
   	,grantType : ""
   	,isAccessTokenFound : false
   	,clientId :""
   	,isClientIdFound: false
   	,isValidGrantType : false
   	,isScopeFound: false
   	,redirectURI :""
   	,scope:""
   };
   if(respObj.accessToken != null)
   {
   	respObj.isAccessTokenFound = true; 
   }



	/*need To be introduce table*/

	if(grantType == "password")
	{
	 respObj.isValidGrantType = true;
	 respObj.grantType=grantType;
		
	}
	else
	{
		respObj.respCode=1;
		respObj.grantType=grantType;
		respObj.error="Invalid Grant Type";
	}
	if(clientId == "CLIENTSP")
	{
	 
	 respObj.isClientIdFound = true;
	 respObj.clientId=clientId;
		
	}
	else
	{
		
		respObj.respCode=2;

		 respObj.clientId=clientId;
		respObj.error="Invalid Client Id";
	}
	if(scope == "GSA")
	{
	 respObj.isScopeFound = true;
	 respObj.SCOPE=scope;
		
	}
	else
	{
		respObj.respCode=3;
		respObj.SCOPE=scope;
		respObj.error="Invalid Scope";
	}

     
    


	res.respObj= respObj;
   callback(req,res);
}

function token(req,res)
{


	validInput(req,res, function(req,res)
	{
		log.info("AF:001:validInput ");
		console.log(res.respObj);
		
		if (res.respObj.respCode == 0)
		{


				res.send(JSON.stringify(res.respObj));

	
		}
		else
		{
				res.writeHeader(302, JSON.stringify(res.respObj));
				res.end();

		}
		


	});



}

app.post('/token' , function(req,res) {

	token(req,res);
	
}
);


app.get('/token' , function(req,res) {
	
	token(req,res);
}
);
///token

console.log(__dirname);
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/mids'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

//var privateKey = fs.readFileSync( '/home/ubuntu/ssl/uss13.key' ).toString();
//var certificate = fs.readFileSync( '/home/ubuntu/ssl/uss13.crt' ).toString();
//var caroot = fs.readFileSync( '/home/ubuntu/ssl/ussca.crt' ).toString();

//var options = {key: privateKey, cert: certificate,ca :caroot};

//var privateKeyUss12 = fs.readFileSync( '/home/ubuntu/ssl/uss12.key' ).toString();
//var certificateUss12 = fs.readFileSync( '/home/ubuntu/ssl/uss12.crt' ).toString();
//var optionsUss12 = {key: privateKeyUss12, cert: certificateUss12};


//http.createServer(app).listen(80, function() { console.log('Listening on port %d', "80"); });
//http.createServer(app).listen(50145, function() { console.log('Listening on port %d', "50145"); });
//https.createServer(options, app).listen(50146, function() { console.log('Listening on port %d', "50146"); });
//https.createServer(options, app).listen(443, function() { console.log('Listening on port %d', "443"); });
//https.createServer(optionsUss12, app).listen(50146, function() { console.log('Listening on port %d', "50146"); });
