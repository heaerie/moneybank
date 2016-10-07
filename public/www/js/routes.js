/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
    'use strict';
    return app.config(['$routeProvider','$stateProvider','$state', function ($routeProvider,$stateProvider,$state) {
        $routeProvider.when('/view1', {
            templateUrl: 'partials/partial1.html',
            controller: 'MyCtrl1'
        });

        $routeProvider.when('/view2', {
            templateUrl: 'partials/partial2.html',
            controller: 'MyCtrl2'
        });
/*[
        $stateProvider.state('home', {
        url: '/home',
        views: {

            // the main template will be placed here (relatively named)
            '': { templateUrl: 'partials/partial1.html' },

            // the child views will be defined here (absolutely named)
            'columnOne@home': { template: 'Look I am a column!' },

            // for column two, we'll define a separate controller 
            'columnTwo@home': { 
                templateUrl: 'partials/partial2.html',
                controller: 'MyCtrl2'
            }
        }
        
    });

        $routeProvider.otherwise({
           $state.go('home');
        });
]*/

    }]);
});
