'use strict';

module.exports = ['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {       
        $routeProvider
            .when('/login', {
                template: '<login></login>'
            })
            .when('/register', {
                template: '<register></register>'
            });
        $locationProvider.html5Mode(true);
    }];