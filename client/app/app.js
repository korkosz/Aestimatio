'use strict';

var angular = require('angular');

angular
    .module('aestimatio', [
        require('angular-route'),
        require('angular-resource'),
        require('angular-ui-router').default,
        require('../../components/dropdown/dropdown').name,
        require('../../components/modal/modal').name,
        require('../../components/pill/pill').name,
        require('../../components/calendar/calendar').name,
        require('../../components/horizontal_calendar/horizontalCalendar').name,
        require('./auth').name,
        require('./user').name,
        require('./class').name,
        require('./home').name
    ])
    .config(require('./app.states'))
    .run(['$rootScope', '$state', 'auth', '$transitions',
        ($rootScope, $state, auth, $transitions) => {
            $transitions.onError({}, () => {
                $state.go('login');
            });
        }])
    .controller('globalCtrl', ['auth', '$state', '$scope', function (auth, $state, $scope) {
        var vm = this;

        $scope.$watch(() => {
            return auth.getUser();
        }, () => {
            var hamburger = $('.l-menu__hamburger');
            var nav = $('.l-primary-nav');
            var body = $('.cls-body');

            hamburger.removeClass('is-open');
            nav.removeClass('is-open');
            body.removeClass('is-open');

            vm.user = auth.getUser();
        });

        vm.logout = function () {
            auth.logout().then(() => {
                window.location.reload(true);
            });
        };
    }]);