var app = angular.module('ct.modal', []);

app.directive('modal', function () {
    return {
        restrict: 'A',
        link(scope, el) {
            var openModalBtn = el.find('.l-btn__add');
            var mask = openModalBtn.closest('.m-modals__mask');
            var modalBody = openModalBtn.siblings('.m-modals__add-modal');

            openModalBtn.on('click', (event) => {
                event.stopPropagation();

                scope.$emit('modalOpened');

                //show modal body
                modalBody.removeClass('is-close')
                    .addClass('is-open');

                //add modal mask
                mask.addClass('is-open');

                /**
                 * click outside of the modal hides it
                 */
                $(window).click(function (e) {
                    if (
                        !modalBody.is(e.target) &&
                        modalBody.has(e.target).length === 0 &&
                        modalBody.hasClass('is-open') &&
                        mask.hasClass('is-open')
                    ) {
                        modalBody.removeClass('is-open')
                            .addClass('is-close');
                        mask.removeClass('is-open');

                        scope.$emit('modalClosed');
                    }
                });
            });
        }
    };
});

module.exports = app;
