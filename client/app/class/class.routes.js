module.exports = ['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/class/search', {
            template: '<class-search></class-search>'
        })
        .when('/class/settings', {
            template: '<class-settings></class-settings>'
        })
        .when('/class/timetable', {
            template: '<class-timetable></class-timetable>'
        });
}];