define([],function(){

return ['$resource',function  ($resource) {
	// body...


	alert("sendMessageService");
	return $resource('/api/dashboard/:action', null,
    {

    	/*
    	var div="UserDtl";
	var url="getUserDetail.php";
	var json={USRID:glUserId};
	onPostReq(url,json,div,'DIV');
	 div="GrpMember";
	 url="getGroupMember.php";
	 json={USRID:glUserId};
	onPostReq(url,json,div,'DIV');
	 div="txnDtl";
	 url="getUserTxn.php";
	 json={USRID:glUserId};
	onPostReq(url,json,div,'DIV');
	div='StmtMonthDiv';
	url='getStmtDescDb.php';

    	*/
         getUserDetail    : { method:'POST', params:{"action" : "getUserDetail"}      }
        ,GrpMember        : { method:'POST', params:{"action" : "GrpMember"} }
        ,getCardDetail       : { method:'POST', params:{"action" : "getCardDetail"}     }
        ,getStmtDescDb    : { method:'POST', params:{"action" : "getStmtDescDb"}     }
    });
	
}
];

});