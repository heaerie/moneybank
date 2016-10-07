define([],function(){

return ['$resource',function  ($resource) {
	// body...
	return $resource('/api/messageContentPreview/:action', null,
    {
         preview    : { method:'POST', params:{"action"  : "preview"}      }
       
    });
	
}
];

});