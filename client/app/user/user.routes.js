module.exports = ['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/user/grades', {
            template: '<user-grades></user-grades>'           
        });
}];