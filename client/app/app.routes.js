'use strict';

module.exports = ['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {       
        $routeProvider
            .when('/login', {
                template: '<login></login>'
            });
        $locationProvider.html5Mode(true);
    }];