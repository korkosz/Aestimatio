module.exports = function ($stateProvider) {
    $stateProvider.state({
        name: 'user.class',
        template: '<ui-view />',
        url: '/class',
        abstract: true,
        resolve: {
            userClass(classService) {
                return classService.UserClass.$promise;
            }
        }
    });

    $stateProvider.state({
        name: 'user.class.search',
        component: 'classSearch',
        url: '/search'
    });

    $stateProvider.state({
        name: 'user.class.settings',
        component: 'classSettings',
        url: '/settings'
    });

    $stateProvider.state({
        name: 'user.class.timetable',
        component: 'classTimetable',
        url: '/timetable'
    });
};