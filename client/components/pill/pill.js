var app = angular.module('ct.pill', []);

app.directive('pill', function () {
    return {
        transclude: true,
        templateUrl: '/static/components/pill/pill.html',
        scope: {
            delete: '&'
        }
    };
});

module.exports = app;