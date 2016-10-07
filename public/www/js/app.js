/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'jquery',
    'angular-route',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (angular) {
    'use strict';




    var webApp= angular.module('app', [
         'app.controllers'
        ,'app.directives'
        ,'app.filters'
        ,'app.services'
        ,'ngRoute'
    ]);


    webApp.config('$routeProvider', '$locationProvider', '$httpProvider',function  ($routeProvider,$locationProvider,$httpProvider) {
        // body...
 
    //$httpProvider.defaults.headers.post['XSRF-AUTH'] = "some accessToken to be generated later"; 

        console.log('httpProvider');
        console.log($httpProvider);
    $httpProvider.defaults.headers.post['x-access-token'] = "access token";
        
        });

  

    return webApp;
});
