'use strict';

module.exports = ['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                template: '<home user-class="$resolve.userClass"></home>',
                resolve: {
                    user($q, auth) {
                        if(auth.isLoggedIn()) {
                            return $q.when(null);
                        } else {
                            return auth.setUser();
                        }
                    },
                    userClass(classService) {
                        return classService.UserClass.$promise;
                    },
                    userResource: function (userService) {
                        return userService.User.$promise;
                    }
                }
            })
            .when('/logout', {
                template: '',
                controller($location, auth) {
                    
                }
            });
        $locationProvider.html5Mode(true);
    }];