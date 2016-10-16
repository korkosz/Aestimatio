'use strict';

module.exports = ['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                template: '<home user-class="$resolve.userClass"></home>',
                resolve: {
                    userClass(classService) {
                        return classService.UserClass.$promise;
                    },
                    userResource: function (userService) {
                        return userService.User.$promise;
                    }
                }
            })
            .when('/login', {
                template: '<login></login>'
            })
            .when('/register', {
                template: '<register></register>'
            })
            .when('/logout', {
                template: '',
                controller($location, auth) {
                    auth.logout().then(() => {
                        $location.path('/login');
                    });
                }
            });
        $locationProvider.html5Mode(true);
    }];