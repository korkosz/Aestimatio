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
        require('../../components/nav_menu/navMenu').name,
        require('../../components/horizontal_calendar/horizontalCalendar').name,
        require('./auth').name,
        require('./user').name,
        require('./class').name,
        require('./home').name
    ])
    .config(require('./app.states'))
    .run(['$q', '$state', 'auth', '$transitions',
        ($q, $state, auth, $transitions) => {
            $transitions.onError({}, (trans) => {
                $state.defaultErrorHandler = function () {
                    return function (err) {
                        if (err) {
                            console.warn(err); //eslint-disable-line
                        }
                    };
                };
                if (trans._error === 'classAuth') {
                    $state.go('auth.search');
                } else if (trans._error === 'notAnAdmin') {
                    $state.go('auth.authClass.home');
                } else {
                    $state.go('login');
                }
            });

            $transitions.onEnter({ entering: matchAdminStates }, function (transition) {
                var user = transition.getResolveValue('authUser');

                if (!user.admin) {
                    return $q.reject('notAnAdmin');
                }
            });

            function matchAdminStates(state) {
                return state.data && state.data.adminOnly;
            }
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

        vm.hasClass = function () {
            return auth.hasClassAssigned();
        };
    }]);