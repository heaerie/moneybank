define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/api/signatureVerifyService/:action', null,
    {
         verify    : { method:'POST', params:{"action"  : "verify"}      }
       
    });
	
}
];

});