module.exports = angular.module('navigation', [])
    .directive('navMenu', function () {
        return {
            templateUrl: '/static/components/nav_menu/navMenu.html',
            scope: {
                userName: '@',
                logout: '&'
            },
            link() {
                var windowWidth = window.innerWidth;
                var hamburger = $('.l-menu__hamburger');
                var navItem = $('.l-primary-nav__item a');
                var nav = $('.l-primary-nav');
                var body = $('.cls-body');

                // open and close primary menu
                hamburger.click(function (e) {
                    event.stopPropagation(e);
                    toggle();
                });

                if (windowWidth < 1400) {
                    navItem.click(function () {
                        toggle();
                    });

                    // close menu when click outside itself
                    $(window).click(function (e) {
                        if (!nav.is(e.target)
                            && nav.has(e.target).length === 0) {
                            remove();
                        }
                    });
                }

                function toggle() {
                    hamburger.toggleClass('is-open');
                    nav.toggleClass('is-open');
                    body.toggleClass('is-open');
                }

                function remove() {
                    hamburger.removeClass('is-open');
                    nav.removeClass('is-open');
                    body.removeClass('is-open');
                }
            }
        };
    });