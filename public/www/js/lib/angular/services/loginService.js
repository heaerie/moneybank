define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/gpasso/:action', null,
    {
         authorize    : { method:'POST', params:{"action" : "auth"}      }
        ,authorizeSSO : { method:'POST', params:{"action" : "authorize"} }
        ,tokenSSO     : { method:'POST', params:{"action" : "tokenSSO"}     }
    });
	
}
];

});