var app = angular.module('ct.dropdown', []);

app.directive('dropdown', function () {
    return {
        restrict: 'A',
        link(scope, el, attrs) {            
            var btn = el.find('.l-dropdown__btn');

            if (scope.$eval(attrs.dropDownDisabled)) {
                btn.removeClass('l-dropdown__btn');
                return;
            }

            btn.click(clickHandler);

            function clickHandler(event) {
                var btnClick = $(this);
                var wrapper = btnClick.parent('.l-dropdown-wrapper');
                var menu = btnClick.siblings('.l-dropdown__menu');

                // open dropdown 
                event.stopPropagation(); // trigger only btn

                wrapper.siblings()
                    .removeClass('is-open')
                    .addClass('is-close'); // make sure that every sibling is close

                wrapper.removeClass('is-close')
                    .addClass('is-open'); // open dropdown menu

                // close dropdown
                $(window).click(function (e) {
                    if (!menu.is(e.target)
                        && menu.has(e.target).length === 0) {
                        wrapper.removeClass('is-open').addClass('is-close');
                    }
                });
            }
        }
    };
});

module.exports = app;
