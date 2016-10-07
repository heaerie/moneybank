define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('myController', [function ($scope) {

    	alert("i am  myController");

    	$scope.uss_submit= function()
    	{
    		alert("uss_submit");
    	}

    }]);
});
