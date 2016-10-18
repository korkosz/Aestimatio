module.exports = function ($stateProvider) {
    $stateProvider.state({
        name: 'auth',
        template: '<ui-view />',
        abstract: true,
        resolve: {
            authUser($q, auth) {
                if (auth.isLoggedIn()) {
                    return $q.when(null);
                } else {
                    return auth.setUser();
                }
            }
        }
    });

    //you can access children only  
    //if user is assigned to a class
    $stateProvider.state({
        name: 'auth.authClass',
        template: '<ui-view />',
        abstract: true,
        resolve: {
            authClass($q, auth) {
                var defer = $q.defer();
                var promise = defer.promise;
                var userAssignedToClass
                    = auth.hasClassAssigned();

                userAssignedToClass ? 
                    defer.resolve() : defer.reject('classAuth');
 
                return promise;
            }
        }
    });

    $stateProvider.state({
        name: 'auth.authClass.home',
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