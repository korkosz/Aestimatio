module.exports = function ($stateProvider) {
    $stateProvider.state({
        name: 'user',
        template: '<ui-view />',
        abstract: true,
        resolve: {
            user($q, auth) {
                if (auth.isLoggedIn()) {
                    return $q.when(null);
                } else {
                    return auth.setUser();
                }
            }
        }
    });

    $stateProvider.state({
        name: 'user.home',
        url: '/home',
        component: 'home',
        resolve: {
            userClass(classService) {
                return classService.UserClass.$promise;
            },
            userResource: function (userService) {
                return userService.User.$promise;
            }
        }
    });
};   