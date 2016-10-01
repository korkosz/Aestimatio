var app = angular.module('ct.dropdown', []);

app.directive('dropdown', function () {
    return {
        restrict: 'A',
        link(scope, el) {
            var btn = el.find('.l-dropdown__btn');
            
            btn.click(function () {
                $(this).parent('.l-dropdown-wrapper')
                    .toggleClass('is-open is-close');
            });
        }
    };
});

module.exports = app;