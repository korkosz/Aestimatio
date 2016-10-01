var app = angular.module('ct.modal', []);

app.directive('modal', function () {
    return {
        restrict: 'A',
        link(scope, el) {
            var openModalBtn = el.find('.l-btn__add');
            var mask = openModalBtn.closest('.m-modals__mask');
            var modalBody = openModalBtn.siblings('.m-modals__add-modal');

            openModalBtn.on('click', () => {
                //show modal body
                modalBody.removeClass('is-close')
                    .addClass('is-open');

                //add modal mask
                mask.addClass('is-open');
                mask.prepend('<div id="m-modals-mask"></div>');

                /**
                 * click outside of the modal hides it
                 */
                $('#m-modals-mask').click(function () {
                    //hide modal body
                    modalBody.removeClass('is-open')
                        .addClass('is-close');

                    //remove modal mask
                    mask.removeClass('is-open');
                    $(this).remove();

                    //hide dropdown
                    el.find('.l-dropdown-wrapper')
                        .addClass('is-close')
                        .removeClass('is-open');

                    scope.$emit('modalClosed');
                });
            });
        }
    };
});

module.exports = app;