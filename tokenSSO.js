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
	//console.log(respObj);

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
    uri: 'http://localhost:5000/token',
    form: {
        some: 'payload' // Will be urlencoded
    },
    headers: respObj

		};

console.log('after validInputSSO');
	request(options)
    .then(function (body) {
        // POST succeeded...
        console.log("Success")
        //console.log(body);
        res.send(body);
    })
    .catch(function (err) {
        // POST failed...

        console.log(err);
        res.send(err);
    });
	
		


	});



}
