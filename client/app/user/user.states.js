module.exports = function ($stateProvider) {
    $stateProvider.state({
        name: 'auth.authClass.user',
        template: '<ui-view />',
        url: '/user',
        abstract: true,
        resolve: {
            userClass(classService) {
                return classService.UserClass.$promise;
            }
        }
    });

    $stateProvider.state({
        name: 'auth.authClass.user.grades',
        component: 'userGrades',
        url: '/grades'
    });

};