define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/api/signup/:action', null,
    {
         signup    : { method:'POST', params:{"action" : "signup"}      }
        ,edit      : { method:'POST', params:{"action" : "authorize"} }
        ,view      : { method:'POST', params:{"action" : "token"}     }
        ,register  : { method:'POST', params:{"action" : "register"}     }
    });
	
}
];

});