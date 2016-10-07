define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/api/basicDet/:action', null,
    {
         save    : { method:'POST', params:{"action"  : "save"}      }
        ,edit    : { method:'POST', params:{"action"  :  "edit"} }
        ,view     : { method:'POST', params:{"action" : "view"}     }
 		,Add     : { method:'POST', params:{"action" : "Add"}     }
 		,"new"     : { method:'POST', params:{"action" : "new"}     }
    });
	
}
];

});