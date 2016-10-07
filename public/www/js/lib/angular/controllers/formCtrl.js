define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('formCtrl', [function ($scope) {

    	alert("i am  from form controllers");


    	$scope.uss_submit=function()
    	{

    		alert("I am in uss_submit");
    	};
    }]);
});
