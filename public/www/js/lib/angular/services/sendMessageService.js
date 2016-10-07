define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/api/sendMessage/:action', null,
    {
         upload    : { method:'POST', params:{"action"  : "upload"}      }
       
    });
	
}
];

});