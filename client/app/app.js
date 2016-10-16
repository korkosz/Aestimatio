'use strict';

var angular = require('angular');

angular
    .module('aestimatio', [
        require('angular-route'),
        require('angular-resource'),
        require('../../components/dropdown/dropdown').name,
        require('../../components/modal/modal').name,
        require('../../components/pill/pill').name,
        require('../../components/calendar/calendar').name,
        require('../../components/horizontal_calendar/horizontalCalendar').name,
        require('./account').name,
        require('./user').name,
        require('./class').name,
        require('./home').name
    ])
    .config(require('./app.routes'))
    .run(['$rootScope', '$location', 'auth', ($rootScope, $location, auth) => {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!auth.isLoggedIn()) {
                $location.path('/login');
            }
        }); 
    }])
    .controller('globalCtrl', ['auth', function (auth) {
        var vm = this;

        auth.waitForUser().then(() => {
            vm.user = auth.getUser();
        });
    }]);

angular
    .element(document)
    .ready(() => {
        angular.bootstrap(document, ['aestimatio'], {
            // strictDi: false
        });
    });