module.exports = ['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/class/search', {
            template: '<class-search></class-search>'
        })
        .when('/class/settings', {
            template: '<class-settings></class-settings>',
            resolve: {
                class: ['classService', 'auth', function (classService, auth) {
                    auth.waitForUser().then(() => {
                        var user = auth.getUser();
                        return classService.get({ classId: user.class });
                    });
                }]
            }
        })
        .when('/class/timetable', {
            template: '<class-timetable></class-timetable>'
        });
}];