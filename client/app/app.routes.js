'use strict';

module.exports = ['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {       
        $routeProvider
            .when('/home', {
                template: '<home user-class="$resolve.userClass"></home>',
                resolve: {
                    userClass(classService) {
                        return classService.UserClass.$promise;
                    }
                }
            })
            .when('/login', {
                template: '<login></login>'
            })
            .when('/register', {
                template: '<register></register>'
            });
        $locationProvider.html5Mode(true);
    }];