module.exports = ['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/user/grades', {
            template: '<user-grades user-class="$resolve.userClass"></user-grades>',
            resolve: {
                userClass: function(classService) {
                    return classService.UserClass.$promise;
                }
            }           
        });
}];