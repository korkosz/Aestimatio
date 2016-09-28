module.exports = ['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/class/search', {
            template: '<class-search></class-search>'
        })
        .when('/class/settings', {
            template: `<class-settings user-class="$resolve.userClass">
                        </class-settings>`,
            resolve: {
                userClass: function (classService) {
                    return classService.UserClass.$promise;                   
                }
            }
        })
        .when('/class/timetable', {
            template: '<class-timetable></class-timetable>'
        });
}];