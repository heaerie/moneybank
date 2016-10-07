/*--
Blocks
*/
var mysql = require('mysql');
var poolGl  = mysql.createPool({
  host     : 'localhost',
  user     : 'u1021977_admin',
  password : 'india' ,
  database : 'DBHSP'
});


var log                 = require('../../libs/log')(module);



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


function getCardDetail( pool, inUsrId, inGrpId,callback)
 {



 	poolGl.getConnection(function(err, connection) {

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




mandarayFieldCheck=function(schemaJson,dataJson,callback)
{

	console.log("I am in imandarayFieldCheck ");

	return 0;

}

/*--
	exports Mapper to outside
*/

exports.navi=function(inSchemaJsonUrl,inJson, callback)
{

	console.log("CardDetail.navi");
	var outSchemaJsonUrl=inSchemaJsonUrl;
	var OutJson=inJson;
	
	
	
	callback(true,outSchemaJsonUrl,OutJson);
}
exports.crit=function(pool,inSchemaJsonUrl,inJson, callback)
{
	console.log("CardDetail.crit");
	var outSchemaJsonUrl=inSchemaJsonUrl;
	var OutJson=inJson;
		
	/* mandarayFieldCheck(inSchemaJsonUrl,inJson, function (respCode, respDescr, response)
	{
		console.log("out put Mapping");
	}
	);
*/


var  respJson={outSchemaJson:'' ,OutJson:''};
var	title="CardDetail";

getCardDetail( pool,1, 1, function(status, respMessage,data)

							{

								//console.log('data');
								//console.log(data[0]);
								//console.log('respMessage');
								//console.log(respMessage);
								if( status)
								{

										
											//console.log(genSchema('User Details',respMessage));
											//respJson.schemaJson = respMessage;//genSchema(respMessage);
											respJson.outSchemaJson = genSchemaCollection(title,respMessage);//genSchema(respMessage);
											respJson.OutJson   = [ {CardDetail : data}];
;											//res.send(respJson);
										callback(true,respJson.outSchemaJson,respJson.OutJson);
								}
								else
								{
									//res.send(data[0]);	

										callback(false,respJson.outSchemaJson,respJson.OutJson);
								}
							}
								);
	
}
exports.dtil=function(inSchemaJsonUrl,inJson, callback)
{
	var outSchemaJsonUrl=inSchemaJsonUrl;
	var OutJson=inJson;
	callback(true,outSchemaJsonUrl,OutJson);
}
exports.rslt=function(inSchemaJsonUrl,inJson, callback)
{
	var outSchemaJsonUrl=inSchemaJsonUrl;
	var OutJson=inJson;
	callback(true,outSchemaJsonUrl,OutJson);
}
