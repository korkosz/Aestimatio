'use strict';

angular.module('aestimatio')
    .config(($routeProvider) => {
        $routeProvider.when('/login', {
            template: '<login></login>'
        });
    });