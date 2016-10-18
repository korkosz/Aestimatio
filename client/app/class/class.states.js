module.exports = function ($stateProvider) {
    $stateProvider.state({
        name: 'auth.class',
        template: '<ui-view />',
        url: '/class',
        abstract: true
    });

    $stateProvider.state({
        name: 'auth.class.search',
        component: 'classSearch',
        url: '/search',
    });

    $stateProvider.state({
        name: 'auth.authClass.class.settings',
        component: 'classSettings',
        url: '/settings',
        resolve: {
            userClass(classService) {
                return classService.UserClass.$promise;
            }
        }
    });

    $stateProvider.state({
        name: 'auth.authClass.class.timetable',
        component: 'classTimetable',
        url: '/timetable',
        resolve: {
            userClass(classService) {
                return classService.UserClass.$promise;
            }
        }
    });
};