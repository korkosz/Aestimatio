module.exports = function ($stateProvider) {
    $stateProvider.state({
        name: 'user.user',
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
        name: 'user.user.grades',
        component: 'userGrades',
        url: '/grades'
    });

};