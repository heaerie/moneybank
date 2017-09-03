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

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

function checkpwd(inUsername, inPassword, callback ){

	if(inUsername != "" && inPassword != "")
	{

	log.info("call get connection..");
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
else
{
	callback(false,{"message" : "Username or Password should not be null" },{});
}
	
}


function getNextSeq(seqName ,callback)
{


	log.info('getNextSeq<' + seqName +'>');
	if(seqName != "")
	{
		pool.getConnection(function(err, connection) 
		{
			var seqInfo = {
					SEQ_VAL : 0
					,SEQ_NAME : seqName
				};

			var query='select SEQ_VAL from DBHSP._SEQUENCE '
			+ ' WHERE   SEQ_NAME             = ' + connection.escape(seqName) +' ';
		//var query='select distinct gid.USR_ID,rapgl.ROLE_ID ,PAGE_GRP_TITLE ,PAGE_GRP_KEY ,pggr.PAGE_GRP_ID  from DBHSP.MEMA001MB mem , DBHSP.GID001MB  gid  , DBHSP.RAPG004LB rapgl, DBHSP.PGGR005MB pggr where gid.usr_id  = mem.usr_id and   rapgl.ROLE_ID = mem.ROLE_ID and   rapgl.PRTL_PAGE_GRP_ID = rapgl.PRTL_PAGE_GRP_ID and  gid.USR_ID =' + connection.escape(usr_id) +'' ;

			log.info(query);

			var queryRslt=connection.query(query,function(err, rows, fields) 
			{

				//if(err)  callback(false,{"message" : err},rows);
				log.info('SELECT 001');
				console.log(rows);
				rows= rows|| [];
				if ( rows.length ==0 )
				{
					log.info('INSERT 002');
					connection.query('INSERT INTO DBHSP._SEQUENCE SET ?', seqInfo, function(err, result) 
					{
					  if (err)  callback(false,{"message" : err},rows);
					  	//throw err;
					  console.log(result.insertId);
					});

				
				}
				//else
				log.info('UPDATE 003');
				{

					connection.query('UPDATE DBHSP._SEQUENCE SET SEQ_VAL=SEQ_VAL+1  WHERE SEQ_NAME =  ?  '
						, [seqInfo.SEQ_NAME],
					 function(err, result) 
					{
					  if (err) callback(false,{"message" : err},rows);
					  	//throw err;
					  	log.info('UPDATE 003.01');
					query='select SEQ_VAL from DBHSP._SEQUENCE '
						+ ' WHERE   SEQ_NAME             = ' + connection.escape(seqName) +' ';

					console.log(query);
					log.info('SELECT 004');
					connection.query(query,function(err, rows, fields) 
					{

						if(err)  callback(false,{"message" : err},rows);
						rows= rows|| [];
						if ( rows.length ==0 )
						{
								callback(true,{"message" : "success"},rows);	
						}

					});

					  console.log(result);
					});

					
				}

			});
		});
		
	}
	else
		{
			callback(false,{"message" : 'Validation Fail'},rows);
		}
}



function dbError(err)
{
	console.log(err);
}

function doLogin(inUsername, inPassword, callback ){

	log.info("doLogin: LN000");

	if(inUsername != "" && inPassword != "")
	{

	log.info("call get connection..");
	pool.getConnection(function(err, connection) 
	{


		var query='select PROD_NAME prodName, PROD_VERSION  prodVersion, PRTL_NAME prtlName, GRP_NAME grpName,f_name firstName, l_name  lastName,  i.email_id email  , i.GRP_ID  grpId, USR_ID  usrId from GID001MB i, GRP001MB g , PRTL002MB prtl ,PROD001MB prod WHERE prtl.prtl_id  = g.prtl_id AND prod.prod_id = prtl.prod_id AND prtl.PRTL_ST =\'ACTIVE\' AND g.grp_id  = i.grp_id AND  i.email_id ='+ connection.escape(inUsername)+' and i.password = '+ connection.escape(inPassword ) + '';

		log.info(query);
		log.info('call LN:001');

		connection.query(query,function(err, loginDetails, fields){
		log.info('call LN:002');
		loginDetails = loginDetails || [];

			if(err)  callback(false,{"message" : "SYSTEM ERROR" },loginDetails);
	
			if ( loginDetails.length ==0 )
			{
				log.info('call LN:003');
				log.info('in Query : Nodata Found');

				loginDetails=[];	

				log.info('call LN:004');
				callback(false,{"message" : "Invalid Username/Password"},loginDetails);
			}
			else
			{
				log.info('call LN:005');
				log.info('in Query : Record Found' + loginDetails.length);

				console.log(loginDetails);
				log.info('call LN:006');
				var query='select concat(F_NAME, L_NAME ) name ,gid.USR_ID  usrId, rolem.ROLE_NAME  roleName ,rapg.PRTL_PAGE_GRP_ID  pageGroup,pggr.PAGE_GRP_TITLE  pageGroupTitle ,pggr.PAGE_GRP_KEY  pageGroupKey ,rapg.ACCESS_IND accessInd'
				 + ' from '
				 + ' DBHSP.GID001MB  gid     ,'
				 + ' DBHSP.MEMA001MB mema    ,'
				 + ' DBHSP.ROLA003MB rolem   ,'
				 + ' DBHSP.RAPG004LB rapg    ,'
				 + ' DBHSP.PGGR005MB  pggr'
				 + ' where gid.USR_ID             = mema.USR_ID '
				 + ' and   rolem.ROLE_ID          = mema.ROLE_ID'
				 + ' and   rapg.PRTL_PAGE_GRP_ID  = pggr.PRTL_PAGE_GRP_ID'
				 + ' and   gid.USR_ID             = ' + connection.escape(loginDetails[0].usrId) +' '
				 + ' and   rapg.ACCESS_IND        != \'N\' ';
//var query='select distinct gid.USR_ID,rapgl.ROLE_ID ,PAGE_GRP_TITLE ,PAGE_GRP_KEY ,pggr.PAGE_GRP_ID  from DBHSP.MEMA001MB mem , DBHSP.GID001MB  gid  , DBHSP.RAPG004LB rapgl, DBHSP.PGGR005MB pggr where gid.usr_id  = mem.usr_id and   rapgl.ROLE_ID = mem.ROLE_ID and   rapgl.PRTL_PAGE_GRP_ID = rapgl.PRTL_PAGE_GRP_ID and  gid.USR_ID =' + connection.escape(usr_id) +'' ;

log.info(query);


			log.info('call GN:001');
			//var queryRslt=
			connection.query(query,function(err, entitlementDetails, fields) {

				log.info('GN:002');
				entitlementDetails= entitlementDetails|| [];
					var respObj= {
							"loginDetails" : loginDetails
							,"entitlementDetails" :entitlementDetails
						};	


				if(err)  callback(false,{"message" : err},entitlementDetails)
				else
				{

					

					if ( entitlementDetails.length ==0 )
					{
						log.info('call GN:003');
						callback(false,{"message" : "Access Denied"},entitlementDetails);
					}
					else
					{
						log.info('call GN:004');
						

						callback(true,{"message" : "success"},respObj);
					}
				}
			});
				
				//callback(true,{"message" : "success"},rows);
			}
		});
	connection.release();
});

}
else
{
	callback(false,{"message" : "Username or Password should not be null" },[]);
}
	
}




function getGroupNav(usr_id, callback )
{

	log.info('getGroupNav');
pool.getConnection(function(err, connection) {

var query='select CONCAT (gid.f_name, gid.l_name ) Name, gid.USR_ID , rolem.ROLE_NAME  ,rapg.PRTL_PAGE_GRP_ID ,pggr.PAGE_GRP_TITLE ,PAGE_GRP_KEY '
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
	rows= rows|| [];
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
		




		next();

});   


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

app.post('/jsonSchema/:sjson' , function(req,res) {

	if(req.params.sjson == "basicDet.bson" )
	{

		//res.send("[{group:'ussms',name:'basicDet',label:'Basic Details',task:'EA',desc:'N',htmlType:'PAGE', maxCol:'10' ,col:1,entitle:'N',enttlname:'',mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ];");
		//res.send("[{group:'ussms',name:'basicDet',        label:'Basic Details',         task:'EA',desc:'N',htmlType:'PAGE',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		//res.send("[{group:'ussms',name:'basicDet',label:'Basic Details',task:'EA',desc:'N',htmlType:'PAGE',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		res.send(  'E19D74C103555353C2086261736963446574C30D42617369632044657461696c73C4024541C500C60450414745C70B4e4f4e524541444f4e4c59DF120131DF130130C800C9014eCA0450414745CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fE19C00C103555353C2046e616d65C3054e616d6520C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01056e616d6531DF120131DF130130DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fC103555353C208626f647954797065C309426f64792054797065C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B424e4f4e457c4e6f6e657c534c494d7c536c696d7c415645524147457c417665726167657c4154484c455449437c4174686c657469637c48454156597c486561767920DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20A636f6d706c6578696f6eC30A636f6d706c6578696f6eC4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B604e4f4e457c4e6f6e657c56464149527c5665727920466169727c464149527c46616972207c57484541544953487c57686561746973687c4257484541544953487c5768656174697368207c42524f574e7c62726f776e7c4441524b7c4461726bDF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C203616765C30441676520C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C9014eCA064e554d424552CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C203646f62C30D44617465206f66204269727468C4044e4f4e45C500C60444415445C70B4e4f4e524541444f4e4c59C800C90159CA0444415445CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF041944442f4d4d2f59595959206f722044442f4d4f4e2f59595959DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C2087068795374617573C310506879736963616c2053746174757320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B424e4f4e457c4e6f6e657c4e4f524d414c7c4e6f726d616c7c504859534943414c4c594348414c4c454e4745447c506879736963616c6c79206368616c6c656e676564DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C206686569676874C30748656967687420C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20777656967687420C30757656967687420C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C6d6f74686572546f6e677565C30E4d6f7468657220546f6e67756520C4044e4f4e45C500C603444956C70B4e4f4e524541444f4e4c59C800C90159CA03444956CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C6d61726974616c5374617573C30F4d61726974616c2053746174757320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B264e4f4e457c4e6f6e657c557c556e6d6172726965647c4e4d7c4e65766572206d617272696564DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C656174696e67486162697473C30E456174696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B284e4f4e457c4e6f6e657c4e567c4e6f6e205665676574617269616e7c567c5665676574617269616eDF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20E6472696e6b696e67486162697473C3104472696e6b696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B224e4f4e457c4e6f6e657c4e447c4e6f6e2d6472696e6b65727c447c4472696e6b6572DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20D736d6f6b696e67486162697473C30F536d6f6b696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B204e4f4e457c4e6f6e657c4e537c4e6f6e2d736d6f6b65727c537c536d6f6b6572DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130');
		// next res.send("[{group:'ussms',name:'basicDet',label:'Basic Details',task:'EA',desc:'N',htmlType:'COLLECTION',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'COLLECTION',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		
		//res.send("");
		//res.send("[{'group':'USS', 'name':'transActivity', 'label':'Transaction Activity', 'task':'ES', 'desc':'', 'htmlType':'PAGE', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'N', 'dataType':'PAGE', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'1', 'tips':'', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'0', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[{'group':'USS', 'name':'tranDet', 'label':'Transaction Details', 'task':'ES', 'desc':'', 'htmlType':'CONTAINER', 'entitle':'READONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'CONTAINER', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'1', 'tips':'Transaction ', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs': [{'group':'USS', 'name':'tranId', 'label':'Tran Id', 'task':'NONE', 'desc':'', 'htmlType':'TEXT', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'NUMBER', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'25', 'tips':'Transaction Reference Id', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[]}, {'group':'USS', 'name':'tranAmt', 'label':'Transaction Amount', 'task':'NONE', 'desc':'', 'htmlType':'TEXT', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'AMOUNT', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'25', 'tips':'Transaction Reference Id', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[]} ]} ] } ]");
		//res.send('[{"group":"USS","name":"transActivity","label":"Transaction Activity","task":"ES","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[{"group":"USS","name":"tranDet","label":"Transaction Details","task":"ES","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"Y","dataType":"CONTAINER","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"1","tips":"Transaction ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[{"group":"USS","name":"tranId","label":"Tran Id","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"NUMBER","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"25","tips":"Transaction Reference Id","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[]},{"group":"USS","name":"tranAmt","label":"Transaction Amount","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"AMOUNT","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"25","tips":"Transaction Reference Id","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[]}]}]}]');
	}
else if(req.params.sjson == "basicDet.sjson" )
	{

		//res.send("[{group:'ussms',name:'basicDet',label:'Basic Details',task:'EA',desc:'N',htmlType:'PAGE', maxCol:'10' ,col:1,entitle:'N',enttlname:'',mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ];");
		//res.send("[{group:'ussms',name:'basicDet',        label:'Basic Details',         task:'EA',desc:'N',htmlType:'PAGE',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		//res.send("[{group:'ussms',name:'basicDet',label:'Basic Details',task:'EA',desc:'N',htmlType:'PAGE',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		res.send(  '[{"group":"USS","name":"basicDet","label":"Basic Details","task":"EA","desc":"","htmlType":"PAGE","entitle":"NONREADONLY", maxCol:4, col: 1,"enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"name","label":"Name ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"name1",maxCol:4, col: 1,"min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"bodyType","label":"Body Type","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"complexion","label":"complexion","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"age","label":"Age ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"NUMBER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"dob","label":"Date of Birth","task":"NONE","desc":"","htmlType":"DATE","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"DATE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"DD/MM/YYYY or DD/MON/YYYY","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"phyStaus","label":"Physical Status ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"height","label":"Height ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"weight ","label":"Weight ","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"motherTongue","label":"Mother Tongue ","task":"NONE","desc":"","htmlType":"DIV","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"DIV","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"maritalStaus","label":"Marital Status ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|U|Unmarried|NM|Never married","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"eatingHabits","label":"Eating Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NV|Non Vegetarian|V|Vegetarian","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"drinkingHabits","label":"Drinking Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|ND|Non-drinker|D|Drinker","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"smokingHabits","label":"Smoking Habits ","task":"NONE","desc":"","htmlType":"LIST","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"NONE","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"NONE|None|NS|Non-smoker|S|Smoker","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]');
		// next res.send("[{group:'ussms',name:'basicDet',label:'Basic Details',task:'EA',desc:'N',htmlType:'COLLECTION',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'COLLECTION',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		
		//res.send("");
		//res.send("[{'group':'USS', 'name':'transActivity', 'label':'Transaction Activity', 'task':'ES', 'desc':'', 'htmlType':'PAGE', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'N', 'dataType':'PAGE', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'1', 'tips':'', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'0', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[{'group':'USS', 'name':'tranDet', 'label':'Transaction Details', 'task':'ES', 'desc':'', 'htmlType':'CONTAINER', 'entitle':'READONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'CONTAINER', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'1', 'tips':'Transaction ', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs': [{'group':'USS', 'name':'tranId', 'label':'Tran Id', 'task':'NONE', 'desc':'', 'htmlType':'TEXT', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'NUMBER', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'25', 'tips':'Transaction Reference Id', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[]}, {'group':'USS', 'name':'tranAmt', 'label':'Transaction Amount', 'task':'NONE', 'desc':'', 'htmlType':'TEXT', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'AMOUNT', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'25', 'tips':'Transaction Reference Id', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[]} ]} ] } ]");
		//res.send('[{"group":"USS","name":"transActivity","label":"Transaction Activity","task":"ES","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[{"group":"USS","name":"tranDet","label":"Transaction Details","task":"ES","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"Y","dataType":"CONTAINER","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"1","tips":"Transaction ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[{"group":"USS","name":"tranId","label":"Tran Id","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"NUMBER","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"25","tips":"Transaction Reference Id","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[]},{"group":"USS","name":"tranAmt","label":"Transaction Amount","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"AMOUNT","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"25","tips":"Transaction Reference Id","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[]}]}]}]');
	}
	else if(req.params.sjson == "signup.sjson" )
	{

		//res.send("[{group:'ussms',name:'basicDet',label:'Basic Details',task:'EA',desc:'N',htmlType:'PAGE', maxCol:'10' ,col:1,entitle:'N',enttlname:'',mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ];");
		//res.send("[{group:'ussms',name:'basicDet',        label:'Basic Details',         task:'EA',desc:'N',htmlType:'PAGE',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		//res.send("[{group:'ussms',name:'signup',label:'Basic Details',task:'EA',desc:'N',htmlType:'PAGE',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		//res.send("");
		res.send('[{"group":"USS","name":"register","label":"Register","task":"ES","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"fName","label":"First Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"First Name / Given Name","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"lName","label":"Last Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"Lasr Name/Surname","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"mName","label":"Middle Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"20","tips":"Initial / Middle Name ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"email","label":"email address","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"email@myroomexpense.com","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"password","label":"New Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"verify","label":"Confirm Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]');
		//res.send('[{"group":"USS","name":"SignUp","label":"SignUpPage","task":"NONE","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"register","label":"Register","task":"","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"fName","label":"First Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"First Name / Given Name","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"lName","label":"Last Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"Lasr Name/Surname","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"mName","label":"Middle Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"20","tips":"Initial / Middle Name ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"email","label":"email address","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"email@myroomexpense.com","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"password","label":"New Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"verify","label":"Confirm Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]}]');
		//res.send('[{"group":"USS","name":"SignUp","label":"SignUpPage","task":"NONE","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"register","label":"Register","task":"","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"fName","label":"First Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"First Name / Given Name","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"lName","label":"Last Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"Lasr Name/Surname","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"mName","label":"Middle Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"20","tips":"Initial / Middle Name ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"email","label":"email address","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"email@myroomexpense.com","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"password","label":"New Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"verify","label":"Confirm Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]}]');
		//res.send("[{'group':'USS', 'name':'transActivity', 'label':'Transaction Activity', 'task':'ES', 'desc':'', 'htmlType':'PAGE', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'N', 'dataType':'PAGE', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'1', 'tips':'', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'0', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[{'group':'USS', 'name':'tranDet', 'label':'Transaction Details', 'task':'ES', 'desc':'', 'htmlType':'CONTAINER', 'entitle':'READONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'CONTAINER', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'1', 'tips':'Transaction ', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs': [{'group':'USS', 'name':'tranId', 'label':'Tran Id', 'task':'NONE', 'desc':'', 'htmlType':'TEXT', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'NUMBER', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'25', 'tips':'Transaction Reference Id', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[]}, {'group':'USS', 'name':'tranAmt', 'label':'Transaction Amount', 'task':'NONE', 'desc':'', 'htmlType':'TEXT', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'AMOUNT', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'25', 'tips':'Transaction Reference Id', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[]} ]} ] } ]");
		//res.send('[{"group":"USS","name":"transActivity","label":"Transaction Activity","task":"ES","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[{"group":"USS","name":"tranDet","label":"Transaction Details","task":"ES","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"Y","dataType":"CONTAINER","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"1","tips":"Transaction ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[{"group":"USS","name":"tranId","label":"Tran Id","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"NUMBER","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"25","tips":"Transaction Reference Id","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[]},{"group":"USS","name":"tranAmt","label":"Transaction Amount","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"AMOUNT","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"25","tips":"Transaction Reference Id","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[]}]}]}]');
	}
	else if(req.params.sjson == "signup.bson" )
	{

		//res.send("[{group:'ussms',name:'basicDet',label:'Basic Details',task:'EA',desc:'N',htmlType:'PAGE', maxCol:'10' ,col:1,entitle:'N',enttlname:'',mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'OPTION',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ];");
		//res.send("[{group:'ussms',name:'basicDet',        label:'Basic Details',         task:'EA',desc:'N',htmlType:'PAGE',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		//res.send("[{group:'ussms',name:'signup',label:'Basic Details',task:'EA',desc:'N',htmlType:'PAGE',entitle:'N',enttlname:'', maxCol:2, col: 1,mndf:'N',dataType:'PAGE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs: [{  group:'ussms',name:'name',label:'Name ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'name1',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'bodyType',label:'Body Type',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|SLIM|Slim|AVERAGE|Average|ATHLETIC|Athletic|HEAVY|Heavy ',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'complexion',label:'complexion',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|VFAIR|Very Fair|FAIR|Fair |WHEATISH|Wheatish|BWHEATISH|Wheatish |BROWN|brown|DARK|Dark',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'age',label:'Age ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'NUMBER',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'dob',label:'Date of Birth',task:'NONE',desc:'N',htmlType:'DATE',entitle:'N',enttlname:'',mndf:'Y',dataType:'DATE',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'DD/MM/YYYY or DD/MON/YYYY',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'phyStaus',label:'Physical Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NORMAL|Normal|PHYSICALLYCHALLENGED|Physically challenged',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'height',label:'Height ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'Y',dataType:'WIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'weight ',label:'Weight ',task:'NONE',desc:'N',htmlType:'TEXT',entitle:'N',enttlname:'',mndf:'N',dataType:'HIGHT',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N' } ,{  group:'ussms',name:'motherTongue',label:'Mother Tongue ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'0',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'maritalStaus',label:'Marital Status ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|U|Unmarried|NM|Never married',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'eatingHabits',label:'Eating Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'N',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NV|Non Vegetarian|V|Vegetarian',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'drinkingHabits',label:'Drinking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|ND|Non-drinker|D|Drinker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ,{  group:'ussms',name:'smokingHabits',label:'Smoking Habits ',task:'NONE',desc:'N',htmlType:'LIST',entitle:'N',enttlname:'',mndf:'Y',dataType:'VARCHAR',cclass:'ctext',validate:'',dflt:'NONE',min:'0',max:'60',tips:'',onkeyup:'onKeyUp(this)',onchange:'onChange(this)',onkeydown:'onKeyDown(this)',onkeypress:'onKeyPress(this)',onclick:'onClick(this)',listVal:'NONE|None|NS|Non-smoker|S|Smoker',help:'N',helpLink:'',xml:'Y',Xpath:'/', childs:'N'  } ] } ]");
		//res.send("");
		res.send("E19D74C103555353C2086261736963446574C30D42617369632044657461696c73C4024541C500C60450414745C70B4e4f4e524541444f4e4c59C800C9014eCA0450414745CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120134DF130130E19C00C103555353C2046e616d65C3054e616d6520C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01056e616d6531DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120134DF130130C103555353C208626f647954797065C309426f64792054797065C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B424e4f4e457c4e6f6e657c534c494d7c536c696d7c415645524147457c417665726167657c4154484c455449437c4174686c657469637c48454156597c486561767920DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20A636f6d706c6578696f6eC30A636f6d706c6578696f6eC4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B604e4f4e457c4e6f6e657c56464149527c5665727920466169727c464149527c46616972207c57484541544953487c57686561746973687c4257484541544953487c5768656174697368207c42524f574e7c62726f776e7c4441524b7c4461726bDF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C203616765C30441676520C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C9014eCA064e554d424552CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C203646f62C30D44617465206f66204269727468C4044e4f4e45C500C60444415445C70B4e4f4e524541444f4e4c59C800C90159CA0444415445CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF041944442f4d4d2f59595959206f722044442f4d4f4e2f59595959DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C2087068795374617573C310506879736963616c2053746174757320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B424e4f4e457c4e6f6e657c4e4f524d414c7c4e6f726d616c7c504859534943414c4c594348414c4c454e4745447c506879736963616c6c79206368616c6c656e676564DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C206686569676874C30748656967687420C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20777656967687420C30757656967687420C4044e4f4e45C500C60454455854C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C6d6f74686572546f6e677565C30E4d6f7468657220546f6e67756520C4044e4f4e45C500C603444956C70B4e4f4e524541444f4e4c59C800C90159CA03444956CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B0130DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C6d61726974616c5374617573C30F4d61726974616c2053746174757320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B264e4f4e457c4e6f6e657c557c556e6d6172726965647c4e4d7c4e65766572206d617272696564DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20C656174696e67486162697473C30E456174696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C9014eCA0756415243484152CB06637461626c65CC00CD00CF00DF0100DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B284e4f4e457c4e6f6e657c4e567c4e6f6e205665676574617269616e7c567c5665676574617269616eDF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20E6472696e6b696e67486162697473C3104472696e6b696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B224e4f4e457c4e6f6e657c4e447c4e6f6e2d6472696e6b65727c447c4472696e6b6572DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130C103555353C20D736d6f6b696e67486162697473C30F536d6f6b696e672048616269747320C4044e4f4e45C500C6044c495354C70B4e4f4e524541444f4e4c59C800C90159CA0756415243484152CB06637461626c65CC00CD00CF00DF01044e4f4e45DF020130DF03023630DF0400DF050E6f6e4b657955702874686973293bDF060F6f6e4368616e67652874686973293bDF07106f6e4b6579446f776e2874686973293bDF08116f6e4b657950726573732874686973293bDF090E6f6e436c69636b2874686973293bDF0A0E6f6e426c7572652874686973293bDF0B204e4f4e457c4e6f6e657c4e537c4e6f6e2d736d6f6b65727c537c536d6f6b6572DF0C014eDF0D0868656c706c6f6164DF0E0159DF0F00DF11012fDF120131DF130130");
		//res.send('[{"group":"USS","name":"SignUp","label":"SignUpPage","task":"NONE","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"register","label":"Register","task":"","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"fName","label":"First Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"First Name / Given Name","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"lName","label":"Last Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"Lasr Name/Surname","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"mName","label":"Middle Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"20","tips":"Initial / Middle Name ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"email","label":"email address","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"email@myroomexpense.com","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"password","label":"New Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"verify","label":"Confirm Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]}]');
		//res.send('[{"group":"USS","name":"SignUp","label":"SignUpPage","task":"NONE","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"register","label":"Register","task":"","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"N","dataType":"CONTAINER","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[{"group":"USS","name":"fName","label":"First Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"First Name / Given Name","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"lName","label":"Last Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"30","tips":"Lasr Name/Surname","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"mName","label":"Middle Name","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"20","tips":"Initial / Middle Name ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"email","label":"email address","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"email@myroomexpense.com","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"password","label":"New Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]},{"group":"USS","name":"verify","label":"Confirm Password","task":"NONE","desc":"","htmlType":"INPUT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"VARCHAR","cclass":"ctable","parent":"","parentHtmlType":"","validate":"","dflt":"","min":"0","max":"40","tips":"example : !AWEwdf123","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","maxCol":"1","col":"0","childs":[]}]}]}]');
		//res.send("[{'group':'USS', 'name':'transActivity', 'label':'Transaction Activity', 'task':'ES', 'desc':'', 'htmlType':'PAGE', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'N', 'dataType':'PAGE', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'1', 'tips':'', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'0', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[{'group':'USS', 'name':'tranDet', 'label':'Transaction Details', 'task':'ES', 'desc':'', 'htmlType':'CONTAINER', 'entitle':'READONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'CONTAINER', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'1', 'tips':'Transaction ', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs': [{'group':'USS', 'name':'tranId', 'label':'Tran Id', 'task':'NONE', 'desc':'', 'htmlType':'TEXT', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'NUMBER', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'25', 'tips':'Transaction Reference Id', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[]}, {'group':'USS', 'name':'tranAmt', 'label':'Transaction Amount', 'task':'NONE', 'desc':'', 'htmlType':'TEXT', 'entitle':'NONREADONLY', 'enttlname':'', 'mndf':'Y', 'dataType':'AMOUNT', 'cclass':'ctable', 'parent':'', 'validate':'', 'dflt':'', 'min':'0', 'max':'25', 'tips':'Transaction Reference Id', 'onkeyup':'onKeyUp(this);', 'onchange':'onChange(this);', 'onkeydown':'onKeyDown(this);', 'onkeypress':'onKeyPress(this);', 'onclick':'onClick(this);', 'onblure':'onBlure(this);', 'listVal':'||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY', 'help':'N', 'helpLink':'helpload', 'xml':'Y', 'xmlname':'', 'Xpath':'/', 'childs':[]} ]} ] } ]");
		//res.send('[{"group":"USS","name":"transActivity","label":"Transaction Activity","task":"ES","desc":"","htmlType":"PAGE","entitle":"NONREADONLY","enttlname":"","mndf":"N","dataType":"PAGE","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"60","tips":"","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"0","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[{"group":"USS","name":"tranDet","label":"Transaction Details","task":"ES","desc":"","htmlType":"CONTAINER","entitle":"READONLY","enttlname":"","mndf":"Y","dataType":"CONTAINER","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"1","tips":"Transaction ","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[{"group":"USS","name":"tranId","label":"Tran Id","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"NUMBER","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"25","tips":"Transaction Reference Id","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[]},{"group":"USS","name":"tranAmt","label":"Transaction Amount","task":"NONE","desc":"","htmlType":"TEXT","entitle":"NONREADONLY","enttlname":"","mndf":"Y","dataType":"AMOUNT","cclass":"ctable","parent":"","validate":"","dflt":"","min":"0","max":"25","tips":"Transaction Reference Id","onkeyup":"onKeyUp(this);","onchange":"onChange(this);","onkeydown":"onKeyDown(this);","onkeypress":"onKeyPress(this);","onclick":"onClick(this);","onblure":"onBlure(this);","listVal":"||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY","help":"N","helpLink":"helpload","xml":"Y","xmlname":"","Xpath":"/","childs":[]}]}]}]');
	}
	else
	{
		res.send("{resp:'test'}");
	}
});



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
				
				checkpwd( req.body.email,req.body.password, function( result,respObj, logindata ){

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
	res.redirect('www/index.html');
}
else
{

	try
	{
		if ( ! req.session.email  )
		{
			/*res.redirect('glbladmin/pages/login.html'); */

			res.redirect('www/index.html');
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
/*				res.redirect('glbladmin/page/dashboard'); */
				res.redirect('www/index.html');
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


app.post('/service/:id', function(req, res){

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
                +'   ng-model="$'+ req.body.parent  +""+req.body.name   + '" '
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


function addCoreFunction(req,callback)
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

	req.setHeader=function(arg,value)
	{

		
		try
		{
			req.headers[arg]=value;
		}
		catch(e)
		{

			retVal="";
		}
		//return retVal;

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


	callback(req);

}



function validInput(req,callback)
{


	addCoreFunction(req,function(req){

	//var contentType = response.getHeader('content-type');

	//console.log(req);
   var accessToken=	req.getHeader("x-access-token");

   var grantType=req.getParam("grantType");
   var clientId=req.getParam("clientId");
   var scope=req.getParam("scope");
   var state =req.getHeader("user-agent");

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
   	,state: ""
   };

   respObj.state=state;
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

     
    


	//res.respObj= respObj;
	log.info("in validate input :resp OBJ:")
	console.log(respObj);

	log.info("-------------:")
	console.log(req);
	callback(req,respObj);

});
   
}



function authvalidInput(req,callback)
{


	addCoreFunction(req,function(req){

	//var contentType = response.getHeader('content-type');

	console.log(req);
   var accessToken=	req.getHeader("x-access-token");

   var grantType=req.getParam("grantType");
   var clientId=req.getParam("clientId");
   var scope=req.getParam("scope");
   var state =req.getHeader("user-agent");

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
   	,state: ""
   };

   respObj.state=state;
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

     
    


	//res.respObj= respObj;
	log.info("in validate input :resp OBJ:")
	console.log(respObj);

	callback(req,respObj);

});
   
}



function clientValidInput(req,callback)
{


	addCoreFunction(req,function(req){

	//var contentType = response.getHeader('content-type');

	//console.log(req);
   var accessToken=	req.getHeader("x-access-token");

   var grantType=req.getParam("grantType");
   var clientId=req.getParam("clientId");
   var scope=req.getParam("scope");
   var state =req.getHeader("user-agent");

   var respObj= {
   	 respCode : 0
   	,respDescr :""
   	,accessToken :accessToken
   	,userName    :""
   	,error : ""
   	,grantType : true
   	,isAccessTokenFound : true
   	,clientId :""
   	,isClientIdFound: false
   	,isValidGrantType : true
   	,isScopeFound: true
   	,redirectURI :""
   	,scope:""
   	,state: ""
   };

   respObj.state=state;
   if(respObj.accessToken != null)
   {
   	respObj.isAccessTokenFound = true; 
   }



	/*need To be introduce table*/
/*
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
	*/
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
	/*
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

     
    */


	//res.respObj= respObj;
	log.info("in validate input :resp OBJ:")
	console.log(respObj);

	callback(req,respObj);

});

}

function signToken(res,secretkey,callback)
{

	var payload={
		 iss: "Heaerie GSL"
		,aud: "www.myroomexpense.com"
		,iat: ms(sessionExpSec)

		};


//jwt.setExpiration(new Date().getTime() + ms(60));
var token = jwt.sign(payload, secretkey,{complete: true, maxAge:ms(sessionExpSec), expiresInMinutes: sessionExpSec/60});

	res.setHeader("x-access-token",token );
	callback(res);
}


function verifyToken(accessToken,secretkey,callback)
{


	
var rslt=false;
try
{

log.info("in verifyToken");
var token = jwt.verify(accessToken,secretkey );
rslt=true;

}
catch(e)
{
	rslt=false;
	token={};
}

log.info("in verifyToken:token");
console.log(token);
callback(rslt,token);
}

function token(req,res)
{

//res.setHeader("x-access-token","tests" );
	log.info("in token :001");
	var successRespObj={
		token_type:"jwt"

	};
	var errorArr=[
"invalid_request"
,"unauthorized_client"
,"access_denied"
,"unsupported_response_type"
,"invalid_scope"
,"server_error"
,"temporarily_unavailable"
];
	var errorRespObj={
		error : ""
		,error_uri:""
	};

	log.info("in token :002");
	validInput(req, function(req,respObj)
	{
		log.info("AF:001:validInput ");
		console.log(res.respObj);
		
		if (respObj.respCode == 0)
		{

				var username=req.getParam("username");
				var password=req.getParam("password");


				//log.info("userName:" + username);
				//log.info("password:" + password);
				

				doLogin( username,password, function( result,chkRespMessage, logindata ){


						if(result ==false)
						{

							res.respObj=4;
							res.error="Access Denied";
							log.info("af : 001 : checkpwd");
							//res.statusCode =302;
							//res.end(302,JSON.stringify(res.respObj));
							errorRespObj.error=errorArr[2];
							res.statusCode=304;										
							res.send(JSON.stringify(errorRespObj));								
							
						}
						else
						{
							log.info("T:001:Sign Token");

							

							var entitlement=[
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
										'link' :'basicDetUSSAdd'

										,'linkName' :'Basic Details'
										,'uid'  :'basicDetUSSAdd'
										, 'dataType' :'NODE'
										,'child'  : []
										}

									]
								}
								,
								{
  								'link' :'group'
								,'linkName' :'Group Service'
								,'uid' :'groupservice'
								, 'dataType' :'CONTAINER'
								, 'child' : [ 
										{
										'link' :'groupUSSView'
										,'linkName' :'Group'
										,'uid'  :'group'
										, 'dataType' :'NODE'
										,'child'  : []
										}
										,
										{
										'link' :'rollUSSView'
										,'linkName' :'Roll Details'
										,'uid'  :'SchemaGenerator'
										, 'dataType' :'NODE'
										,'child'  : []
										}

									]
								}
								,
								{
  								'link' :'admin'
								,'linkName' :'Admin Service'
								,'uid' :'admin'
								, 'dataType' :'CONTAINER'
								, 'child' : [ 
										{
										'link' :'SchemaGenerator'
										,'linkName' :'Schema Generator'
										,'uid'  :'SchemaGenerator'
										, 'dataType' :'NODE'
										,'child'  : []
										}
										,
										{
										'link' :'SchemaGeneratorView'
										,'linkName' :'Schema Generator View'
										,'uid'  :'SchemaGenerator'
										, 'dataType' :'NODE'
										,'child'  : []
										},
										{
										'link' :'KeyBoard'
										,'linkName' :'Documents'
										,'uid'  :'KeyBoard'
										, 'dataType' :'NODE'
										,'child'  : []
										}

									]
								}
							];
							/*successRespObj.entitlement= {entitle : 'dashboard'};*/
							successRespObj.entitlement= entitlement;
							successRespObj.logindata= logindata;
/*
							getGroupNav( logindata[0].USR_ID, function (result,respMessage, grpdata  ) 
						{
							log.info('in after  getGroupNav T:001 ');
							console.log(result);
							if( result ) 
							{
								log.info('in after  getGroupNav T:002 ');

								successRespObj.entitlement= {entitle : 'dashboard1'};
								
							
							}
							else
							{

								log.info('in after  getGroupNav T:005 ');
								successRespObj.entitlement= {entitle : 'dashboard2'};

								
							}
							
								log.info('in after  getGroupNav T:006 ');
								

						});
*/
								log.info('send response S001');

								signToken(res,secretkey, function(res){
								
								log.error('send response');
								res.send(JSON.stringify(successRespObj));	
							});

						

							

						}

				});

				

	
		}
		else
		{

				if(respObj.isClientIdFound == false)
							{
								errorRespObj.error=errorArr[1];
							}
							else if (respObj.isValidGrantType ==false)
							{
								errorRespObj.error=errorArr[0];
							
							}

				errorRespObj.error=errorArr[3];
							res.statusCode=302;										
							res.send(JSON.stringify(errorRespObj));
							//res.send(JSON.stringify(res.respObj));

		}
		


	});



}



function validInputSSO(req,callback)
{


	addCoreFunction(req,function(req){

	//var contentType = response.getHeader('content-type');

	//console.log(req);
   var accessToken=	req.getHeader("x-access-token");

   var grantType=req.getParam("grantType");
   var clientId=req.getParam("clientId");
   var scope=req.getParam("scope");
   var state =req.getHeader("user-agent");

   var respObj= {
   	 respCode : 0
   	,respDescr :""
   	,accessToken :accessToken
   	,userName    :""
   	,error : ""
   	,grantType : grantType
   	,isAccessTokenFound : false
   	,clientId :clientId
   	,isClientIdFound: false
   	,isValidGrantType : false
   	,isScopeFound: false
   	,redirectURI :""
   	,scope:scope
   	,state: state
   };

   respObj.state=state;
   if(respObj.accessToken != null)
   {
   	respObj.isAccessTokenFound = true; 
   }



	/*need To be introduce table*/
/*[
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

     
    


	//res.respObj= respObj;
	log.info("in validate input :resp OBJ:")
	//console.log(respObj);
*/
	callback(req,respObj);

});
   
}



function tokenSSO(req,res)
{

//res.setHeader("x-access-token","tests" );
	log.info("in token :001");
	var successRespObj={
		token_type:"jwt"

	};
	var errorArr=[
"invalid_request"
,"unauthorized_client"
,"access_denied"
,"unsupported_response_type"
,"invalid_scope"
,"server_error"
,"temporarily_unavailable"
];
	var errorRespObj={
		error : ""
		,error_uri:""
	};

	log.info("in token :002");


	validInputSSO(req, function(req,respObj)
	{
		log.info("AF:001:validInput ");
		//console.log(res.respObj);
		
		var options = {
    method: 'POST',
    uri: 'http://localhost:5000/gpasso/token',
    form: {     		"grantType"     : "password" 
          /*loginService.authorizeSSO({     "grantType"     : "password" */
                      ,'clientId'    : req.getParam('clientId')
                      ,'scope'       : req.getParam('scope')
                      ,'username'    : req.getParam('username')
                      ,'password'    : req.getParam('password')
                      ,'redirectURI' : req.getParam('redirectURI')

                      },
    headers: respObj

		};


console.log('after validInputSSO : options');
console.log(options);

	request(options)
    .then(function (resp) {
        // POST succeeded...
        console.log("Success")
        //console.log(body);

        //"headers":
//"x-powered-by": "Express"
//"x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIZWFlcmllIEdTTCIsImF1ZCI6Ind3dy5teXJvb21leHBlbnNlLmNvbSIsImlhdCI6IjkwMG1zIiwiZXhwIjoxNDY1NDA0NDIyfQ.xRXSM51FOtwcWX5keeIdZUIoYnOk1_P3pe3uIJoehzY"
          //res.setHeader("x-access-token" , headers["x-access-token"]);
          //console.log();
         res.setHeader("x-access-token",resp.headers["x-access-token"]);
        res.send(resp.body);
      

    })
    .catch(function (err) {
        // POST failed...

        console.log(err);
        res.send(err);
    });
	
		


	});



}

function authorize(req,res)
{

//res.setHeader("x-access-token","tests" );
	log.info("in token");
	var successRespObj={
		token_type:"jwt"

	};
	var errorArr=[
"invalid_request"
,"unauthorized_client"
,"access_denied"
,"unsupported_response_type"
,"invalid_scope"
,"server_error"
,"temporarily_unavailable"
];
	var errorRespObj={
		error : ""
		,error_uri:""
	};
	authvalidInput(req, function(req,respObj)
	{
		log.info("AF:001:validInput ");
		//console.log(res.respObj);
		
		if (respObj.respCode == 0)
		{

				//var username=req.getParam("username");
				//var password=req.getParam("password");


				//log.info("userName:" + username);
				log.info("tocken:" + respObj.accessToken);
				

				//checkpwd( username,password, function( result,response, logindata ){
						verifyToken(respObj.accessToken, secretkey,function(result,token)
						{

						if(result ==false)
						{

							res.respObj=4;
							res.error="Access Denied";
							log.info("af : 001 : checkpwd");
							//res.statusCode =302;
							//res.end(302,JSON.stringify(res.respObj));
							errorRespObj.error=errorArr[2];
							res.statusCode=302;										
							res.send(JSON.stringify(errorRespObj));

							


						}
						else
						{
							log.info("T:001:Sign Token");

							console.log(token);

							signToken(res,secretkey, function(res){
								//res.statusCode=302;

								res.send(JSON.stringify(successRespObj));	
							});

							

						
						}

					});

		
		}
		else
		{

				if(respObj.isClientIdFound == false)
				{
					errorRespObj.error=errorArr[1];
				}
				else if (respObj.isValidGrantType ==false)
				{
					errorRespObj.error=errorArr[0];
				
				}

				errorRespObj.error=errorArr[3];
							res.statusCode=302;										
							res.send(JSON.stringify(errorRespObj));
							//res.send(JSON.stringify(res.respObj));

		}
		


	});



}


function authorizeSSO(req,res)
{

//res.setHeader("x-access-token","tests" );
	log.info("in token");
	var successRespObj={
		token_type:"jwt"

	};
	var errorArr=[
"invalid_request"
,"unauthorized_client"
,"access_denied"
,"unsupported_response_type"
,"invalid_scope"
,"server_error"
,"temporarily_unavailable"
];
	var errorRespObj={
		error : ""
		,error_uri:""
	};
	authvalidInput(req, function(req,respObj)
	{
		log.info("AF:001:validInput ");
		//console.log(res.respObj);
		
		if (respObj.respCode == 0)
		{

				//var username=req.getParam("username");
				//var password=req.getParam("password");


				//log.info("userName:" + username);
				log.info("tocken:" + respObj.accessToken);
				

				//checkpwd( username,password, function( result,response, logindata ){
						verifyToken(respObj.accessToken, secretkey,function(result,token)
						{

						if(result ==false)
						{

							res.respObj=4;
							res.error="Access Denied";
							log.info("af : 001 : checkpwd");
							//res.statusCode =302;
							//res.end(302,JSON.stringify(res.respObj));
							errorRespObj.error=errorArr[3];
							res.statusCode=302;										
							res.send(JSON.stringify(errorRespObj));

							


						}
						else
						{
							insertLogin(res.locals.BrowserInfo );
							log.info("T:001:Sign Token");

							console.log(token);

							signToken(res,secretkey, function(res){
								//res.statusCode=302;

								res.send(JSON.stringify(successRespObj));	
							});

							

						
						}

					});

		
				
				

	
		}
		else
		{

				if(respObj.isClientIdFound == false)
							{
								errorRespObj.error=errorArr[1];
							}
							else if (respObj.isValidGrantType ==false)
							{
								errorRespObj.error=errorArr[0];
							
							}

				errorRespObj.error=errorArr[3];
							res.statusCode=302;										
							res.send(JSON.stringify(errorRespObj));
							//res.send(JSON.stringify(res.respObj));

		}
		


	});



}


app.post('/gpasso/tokenSSO' , function(req,res) {

	tokenSSO(req,res);
	
}
);

app.post('/gpasso/token' , function(req,res) {

	token(req,res);
	
}
); 
app.get('/token' , function(req,res) {
	
	token(req,res);
}
);


app.get('/gpasso/token' , function(req,res) {
	
	token(req,res);
}
);


app.post('/gpasso/token' , function(req,res) {
	
	token(req,res);
}
);



app.get('/gpasso/authorize' , function(req,res) {
	
	authorize(req,res);
}
);


app.post('/gpasso/authorize' , function(req,res) {
	
	authorize(req,res);
}
);

app.post('/authorize' , function(req,res) {

	authorize(req,res);
	
}
);


app.get('/authorize' , function(req,res) {
	
	authorize(req,res);
}
);
///token


function clientVerifyToken(req,res,next)
{

	log.info("in token");
	var successRespObj={
		token_type:"jwt"

	};
	var errorArr=[
"invalid_request"
,"unauthorized_client"
,"access_denied"
,"unsupported_response_type"
,"invalid_scope"
,"server_error"
,"temporarily_unavailable"
];
	var errorRespObj={
		error : ""
		,error_uri:""
	};

clientValidInput(req, function(req,respObj)
	{
		log.info("AF:001:validInput ");
		//console.log(res.respObj);
		
		if (respObj.respCode == 0)
		{

				//var username=req.getParam("username");
				//var password=req.getParam("password");


				//log.info("userName:" + username);
				log.info("tocken:" + respObj.accessToken);
				

				//checkpwd( username,password, function( result,response, logindata ){
						verifyToken(respObj.accessToken, secretkey,function(result,token)
						{

						if(result ==false)
						{

							res.respObj=4;
							res.error="Access Denied";
							log.info("af : 001 : checkpwd");
							//res.statusCode =302;
							//res.end(302,JSON.stringify(res.respObj));
							errorRespObj.error=errorArr[3];
							res.statusCode=302;										
							res.send(JSON.stringify(errorRespObj));

							


						}
						else
						{
							log.info("T:001:Sign Token");

							console.log(token);

							signToken(res,secretkey, function(res){
								//res.statusCode=302;

								//res.send(JSON.stringify(successRespObj));	
							});


							next(req,res);
							

						
						}

					});

		
				
				

	
		}
		else
		{

				 if (respObj.isValidGrantType ==false)
							{
								errorRespObj.error=errorArr[0];
							
							}

				errorRespObj.error=errorArr[3];
							res.statusCode=302;										
							res.send(JSON.stringify(errorRespObj));
							//res.send(JSON.stringify(res.respObj));

		}
		


	});
;



}
 

 function getUserDetail( inUsrId, inGrpId,callback)
 {



 	pool.getConnection(function(err, connection) {

var query=
'select f_name First_Name, l_name  Last_Name,  i.acct_type  from DBHSP.GID001MB  i ,  DBHSP.GRP001MB g where g.grp_id  = i.grp_id and  i.acct_type =\'EXPENSE\' and  i.usr_id  = ' + connection.escape(inUsrId) +'';




//var query='select distinct gid.USR_ID,rapgl.ROLE_ID ,PAGE_GRP_TITLE ,PAGE_GRP_KEY ,pggr.PAGE_GRP_ID  from DBHSP.MEMA001MB mem , DBHSP.GID001MB  gid  , DBHSP.RAPG004LB rapgl, DBHSP.PGGR005MB pggr where gid.usr_id  = mem.usr_id and   rapgl.ROLE_ID = mem.ROLE_ID and   rapgl.PRTL_PAGE_GRP_ID = rapgl.PRTL_PAGE_GRP_ID and  gid.USR_ID =' + connection.escape(usr_id) +'' ;

log.info(query);

var queryRslt=connection.query(query,function(err, rows, fields) {

	if(err)  callback(false,{"message" : err},rows);
	rows= rows|| [];
	if ( rows.length ==0 )
	{
		callback(false,{"message" : "Access Denied"},rows);
	}
	else
	{
		callback(true,fields,rows);
	}
});
connection.release();

});
 }
function registerUser( inUsrId, inGrpId,callback)
 {

 	console.log('registerUser');
 	getNextSeq('GRP_ID' ,function(respCode,message,rows){

 		console.log(respCode);
 		console.log(message);
 		console.log(rows);

 	

 	var GRP_ID=rows[0].SEQ_VAL

 	pool.getConnection(function(err, connection) 
 	{

var query='select f_name First_Name, l_name  Last_Name,  i.acct_type  from DBHSP.GID001MB  i ,  DBHSP.GRP001MB g where g.grp_id  = i.grp_id and  i.acct_type =\'EXPENSE\' and  i.usr_id  = ' + connection.escape(inUsrId) +'';
//var query='select distinct gid.USR_ID,rapgl.ROLE_ID ,PAGE_GRP_TITLE ,PAGE_GRP_KEY ,pggr.PAGE_GRP_ID  from DBHSP.MEMA001MB mem , DBHSP.GID001MB  gid  , DBHSP.RAPG004LB rapgl, DBHSP.PGGR005MB pggr where gid.usr_id  = mem.usr_id and   rapgl.ROLE_ID = mem.ROLE_ID and   rapgl.PRTL_PAGE_GRP_ID = rapgl.PRTL_PAGE_GRP_ID and  gid.USR_ID =' + connection.escape(usr_id) +'' ;

log.info(query);

var queryRslt=connection.query(query,function(err, rows, fields) {

	if(err)  callback(false,{"message" : err},rows);
	rows= rows|| [];
	if ( rows.length ==0 )
	{
		callback(false,{"message" : "Access Denied"},rows);
	}
	else
	{
		callback(true,fields,rows);
	}
});
connection.release();

});

 	});
 }


 function getCardDetail( inUsrId, inGrpId,callback)
 {



 	pool.getConnection(function(err, connection) {

var query='select CARD4  Card_Number ,  MIN_DUE_AMT Minimum_Due  , TTL_BAL Total_Balance,  DATE_FORMAT(DUE_DATE, \'%d-%m-%Y\')  Due_Date    from CARD001MB c WHERE  c.usr_id  = ' + connection.escape(inUsrId) +'';

log.info(query);

var queryRslt=connection.query(query,function(err, rows, fields) {

	if(err)  callback(false,{"message" : err},rows);
	rows= rows|| [];
	if ( rows.length ==0 )
	{
		callback(false,{"message" : "Access Denied"},rows);
	}
	else
	{
		callback(true,fields,rows);
	}
});
connection.release();

});
 }


function USSField()
{
	
	var retObj={
 'group'      : 'USS', /*it has been chabged by durai on 02-Feb-2010*/
'name'        :  'name',
'label'      :  'label',
'task'       : 'NONE',
'desc'       : '',
'htmlType'   : 'text', /* newly introduced in USS05*/
'entitle'    : 'READONLY', // Editable /Readonly
'enttlname'  : '',//Entitle name to db
'mndf'       : 'N',
'dataType'   : 'VARCHAR',  // NUMBER/VARCHAR/DATE/EMAIL/AMOUNT/LIST/DIV/
'cclass'     : 'ctable',   //
'parent'     : '',
'validate'   : '',
'dflt'       : '',
'min'        : '0',
'max'        : '60',
'tips'       : '',
'onkeyup'    : 'onKeyUp(this);',
'onchange'   : 'onChange(this);',
'onkeydown'  : 'onKeyDown(this);',
'onkeypress' : 'onKeyPress(this);',
'onclick'    : 'onClick(this);',
'onblure'    : 'onBlure(this);',
'listVal'    : '||A|A-ADD|M|M-MODIFY|I|I-INQURY|C|C-CANCEL|V|V-VERIFY',
'help'       : 'N',
'helpLink'   : 'helpload',
'xml'        : 'Y',
'xmlname'    : '',
'Xpath'      : '/' ,
'maxCol'     : '1',
'col'        : '0'
};

return retObj;
}

 function genSchema(title,fields)
 {
 	var SchemaJson= [];

fieldObj =    USSField();
fieldObj.label    = title;
fieldObj.name    =  title.replace(/ /g,'');
fieldObj.listVal  = '';
fieldObj.dataType = 'CONTAINER';
fieldObj.htmlType = 'TABLE';
fieldObj.dflt     = ''         ;
fieldObj.mndf     = 'N';
fieldObj.max      =  1;
fieldObj.min      = 0;
//maxCol:2, col: 1
fieldObj.maxCol   =  parseInt((fields.length >6 ) ?  6 : fields.length );
fieldObj.col      = 1;

fieldObj.childs   = []	;

//task fix

	
 	for(var i=0; i< fields.length ; i++)
 	{
 	
 		fieldChild       = USSField();
 		//fieldChild.name  = fields[i].name.replace(/_/g,'');
 		fieldChild.name  = fields[i].name;
 		fieldChild.label = fields[i].name.replace(/_/g,' ');
 		fieldChild.max   = fields[i].length;
 		//fieldObj.dataType = 'VARCHAR';
		//fieldObj.htmlType = 'VARCHAR';
 		fieldChild.dflt  = '';

 		fieldObj.childs.push(fieldChild);		
 	};


 	SchemaJson.push(fieldObj);

 	return SchemaJson;

 }


 function genSchemaCollection(title,fields)
 {
 	var SchemaJson= [];

fieldObj =    USSField();
fieldObj.label    = title;
fieldObj.name    =  title.replace(/ /g,'');
fieldObj.listVal  = '';
fieldObj.dataType = 'COLLECTION';
fieldObj.htmlType = 'TABLE';
fieldObj.dflt     = ''         ;
fieldObj.mndf     = 'N';
fieldObj.max      =  'unlimited';
fieldObj.min      = 0;
//maxCol:2, col: 1
fieldObj.maxCol   =  parseInt((fields.length >6 ) ?  6 : fields.length );
fieldObj.col      = 1;

fieldObj.childs   = []	;

//task fix

	
 	for(var i=0; i< fields.length ; i++)
 	{
 	
 		fieldChild       = USSField();
 		//fieldChild.name  = fields[i].name.replace(/_/g,'');
 		fieldChild.name  = fields[i].name;
 		fieldChild.label = fields[i].name.replace(/_/g,' ');
 		fieldChild.max   = fields[i].length;
 		//fieldObj.dataType = 'VARCHAR';
		//fieldObj.htmlType = 'VARCHAR';
 		fieldChild.dflt  = '';

 		fieldObj.childs.push(fieldChild);		
 	};


 	SchemaJson.push(fieldObj);

 	return SchemaJson;

 }

app.post('/api/:module/:service', function(req,res)
{

//console.log('req.params');

//console.log(req.params);

log.info("/api/" +req.params.module +"/"+ req.params.service );


log.info("########################");
		if  (req.params.module  == 'signup' )
		{
		
		//case  'signup' :
				//console.log('In dashboard module');

				switch (req.params.service)
				{
					case  'register' :

							registerUser( 1, 1, function(status, respMessage,data)

							{

								//console.log('data');
								//console.log(data[0]);
								//console.log('respMessage');
								//console.log(respMessage);


								var pageId=1;
var pageType='NAVI';
var SchemaJson={Schema:'Dashboard'};
var DataJson={DataJson:'Dashboard'};

/*
idb.InvokeDB(pageId,pageType,SchemaJson,DataJson,function(rslt,respSchemaJson, respDataJson)
{

	console.log(rslt);
	console.log(respSchemaJson);
	console.log(respDataJson);

});

*/
								if( status)
								{

										var  respJson={};
											title="UserDetails";
											//console.log(genSchema('User Details',respMessage));
											//respJson.schemaJson = respMessage;//genSchema(respMessage);
											respJson.schemaJson = genSchema(title,respMessage);//genSchema(respMessage);
											respJson.jsonData   = [ {UserDetails : data}];
;											res.send(respJson);
									
								}
								else
								{
									res.send(data[0]);	
								}
							}
								);

					break;

				/*	case  'getCardDetail' :

							getCardDetail( 1, 1, function(status, respMessage,data)

							{

								//console.log('data');
								//console.log(data[0]);
								//console.log('respMessage');
								//console.log(respMessage);
								if( status)
								{

										var  respJson={};
											title="CardDetail";
											//console.log(genSchema('User Details',respMessage));
											//respJson.schemaJson = respMessage;//genSchema(respMessage);
											respJson.schemaJson = genSchemaCollection(title,respMessage);//genSchema(respMessage);
											respJson.jsonData   = [ {CardDetail : data}];
;											res.send(respJson);
									
								}
								else
								{
									res.send(data[0]);	
								}
							}
								);

					break;
					*/

				}

		

		} 
		else
		{

	//console.log('call clientVerifyToken');
	clientVerifyToken(req, res, function (req,res){

		//console.log('In Process clientVerifyToken');


		



		switch (req.params.module)
		{
		case  'dashboard' :
				console.log('In dashboard module');
				console.log(req.body);

				switch (req.params.service)
				{
					case  'getUserDetail' :

							getUserDetail( req.body.usrId,req.body.grpId , function(status, respMessage,data)

							{

								//console.log('data');
								//console.log(data[0]);
								//console.log('respMessage');
								//console.log(respMessage);
								if( status)
								{

										var  respJson={};
											title="UserDetails";
											//console.log(genSchema('User Details',respMessage));
											//respJson.schemaJson = respMessage;//genSchema(respMessage);
											respJson.schemaJson = genSchema(title,respMessage);//genSchema(respMessage);
											respJson.jsonData   = [ {UserDetails : data}];
;											res.send(respJson);
									
								}
								else
								{
									res.send(data[0]);	
								}
							}
								);

					break;

					case  'getCardDetail' :

							getCardDetail( req.body.usrId, req.body.grpId , function(status, respMessage,data)

							{

								//console.log('data');
								//console.log(data[0]);
								//console.log('respMessage');
								//console.log(respMessage);
								if( status)
								{

										var  respJson={};
											title="CardDetail";
											//console.log(genSchema('User Details',respMessage));
											//respJson.schemaJson = respMessage;//genSchema(respMessage);
											respJson.schemaJson = genSchemaCollection(title,respMessage);//genSchema(respMessage);
											respJson.jsonData   = [ {CardDetail : data}];
;											res.send(respJson);
									
								}
								else
								{
									res.send(data[0]);	
								}
							}
								);

					break;

				}




				break;
		case  'signup' :
				//console.log('In dashboard module');

				switch (req.params.service)
				{
					case  'register' :

					getUserDetail( 1, 1, function(status, respMessage,data)

							{

								//console.log('data');
								//console.log(data[0]);
								//console.log('respMessage');
								//console.log(respMessage);
								if( status)
								{

										var  respJson={};
											title="UserDetails";
											//console.log(genSchema('User Details',respMessage));
											//respJson.schemaJson = respMessage;//genSchema(respMessage);
											respJson.schemaJson = genSchema(title,respMessage);//genSchema(respMessage);
											respJson.jsonData   = [ {UserDetails : data}];
;											res.send(respJson);
									
								}
								else
								{
									res.send(data[0]);	
								}
							}
								);
				}
			break;	

		case  'basicDet' :
				console.log(req.params.service);

				switch (req.params.service)
				{



					case  'Add' :

						console.log(req.body.basicDet);

						respObj={
							curr_page_id : '1'
							,currState   :'basicDetUSSAdd'
							,nextState   :'basicDetUSSView'
							,respCode    :'0'
							,respDescr   :'successfully Saved'
							,basicDet    : req.body.basicDet

						};

						res.send(respObj);
					case  'save' :

						console.log(req.body.basicDet);

						respObj={
							curr_page_id : '1'
							,currState   :'basicDetUSSSave'
							,nextState   :'basicDetUSSView'
							,respCode    :'0'
							,respDescr   :'successfully Saved'
							,basicDet    : req.body.basicDet

						};

						res.send(respObj);
						/*
							getUserDetail( 1, 1, function(status, respMessage,data)
							{

								//console.log('data');
								//console.log(data[0]);
								//console.log('respMessage');
								//console.log(respMessage);
								if( status)
								{

										var  respJson={};
											title="UserDetails";
											//console.log(genSchema('User Details',respMessage));
											//respJson.schemaJson = respMessage;//genSchema(respMessage);
											respJson.schemaJson = genSchema(title,respMessage);//genSchema(respMessage);
											respJson.jsonData   = [ {UserDetails : data}];
;											res.send(respJson);
									
								}
								else
								{
									res.send(data[0]);	
								}
							}
								);

*/

					break;

					case  'new' :

							console.log(req.body.basicDet);

						respObj={
							curr_page_id : '1'
							,currState   :'basicDetUSSNew'
							,nextState   :'basicDetUSSView'
							,respCode    :'0'
							,respDescr   :'successfully Saved'
							,basicDet    : req.body.basicDet

						};

						res.send(respObj);

					break;

				}




				break;


		case  'login' :
				console.log('In login module');
				break;


		} 

//res.send({"durai": "test"});
//{ module: 'dashboard', service: 'getUserDetail' }


	});

}	

});
console.log(__dirname);
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/mids'));

var server = app.listen(5001, function() {
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
