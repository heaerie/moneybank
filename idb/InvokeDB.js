var mapper= require('./mapper').mapper;
var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'u1021977_admin',
  password : 'india' ,
  database : 'DBHSP'
});

console.log(mapper);

try {
	var schema={ Name:"Schema"};
	var schemaJson={ Name:"Json"};
	var rslt=require('./map/' + mapper[0].map).navi( schema, schemaJson, function (result,outSchema, outJson)
{

	console.error(result);
	console.error(outSchema);
	console.error(outJson);

}

  );


} catch(e) {
	var errMsg = 'Error packing data from  ' + 0 + '\nPackager:  ' ;
	console.error(errMsg);
	throw new Error(errMsg + ': ' + e.message);
}


var  InvokeDB = function(pool,pageId,pageType,SchemaJson,DataJson,calback) {
        pageId && (this.pageId = pageId);


        console.log('PageId' + pageId);
try
{
	if( pageType == 'NAVI')
	{
		require('./map/' + mapper[pageId].map).navi(pool, SchemaJson, DataJson,  calback);
	}
	else if ( pageType == 'CRIT')
	{
		require('./map/' + mapper[pageId].map).crit( pool,SchemaJson, DataJson,  calback);
	}
	else if ( pageType == 'DTIL')
	{
		require('./map/' + mapper[pageId].map).dtil(pool, SchemaJson, DataJson,  calback);
	}
	else if ( pageType == 'RSLT')
	{
		require('./map/' + mapper[pageId].map).rslt(pool, SchemaJson, DataJson,  calback);
	}
}
catch(e)
{
	var errMsg = 'Error mapper data from  ' + pageId + '\n Mapper:  '  + pageType ;
	console.error(errMsg);
	throw new Error(errMsg + ': ' + e.message);

}
	

};

var pageId=4;
var pageType='CRIT';
var SchemaJson={Schema:'Dashboard'};
var DataJson={DataJson:'Dashboard'};

InvokeDB(pool,pageId,pageType,SchemaJson,DataJson,function(rslt,respSchemaJson, respDataJson)
{

	console.log(rslt);
	console.log(respSchemaJson);
	console.log(respDataJson);

});
exports.InvokeDB=InvokeDB;
