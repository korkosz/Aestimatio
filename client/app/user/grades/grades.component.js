class ctrl {
    constructor(auth, userService) {
        this.user = auth.getUser();
        this.formattedGrades = userService
            .usersGrades(this.userClass.subjects, this.user.grades);
    }
}

module.exports.grades = {
    controller: ctrl,
    templateUrl: '/static/app/user/grades/grades.template.html',
    bindings: {
        userClass: '='
    }
};

module.exports.modal = function () {
    return {
        templateUrl: 'modalDirective.html',
        scope: {
            gradeTypes: '<'
        },
        bindToController: true,
        controllerAs: 'modalVm',
        controller($scope) {
            var vm = this;

            vm.grade = {};

            vm.pickType = function (type) {
                vm.grade.type = type;
                $('.l-dropdown-wrapper.is-open')
                    .toggleClass('is-open is-close');
            };

            vm.gradeTypeLabel = function () {
                return `${vm.grade.type.name} [ rate: ${vm.grade.type.rate} ]`;
            };

            vm.addGrade = function() {

                //hide modal 
                $('#m-modals-mask').click();
            };

            $scope.$on('modalClosed', () => {
                vm.grade.name = '';
                vm.grade.type = null;
            });
        },
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

                    scope.$emit('modalClosed');
                });
            });


            /**
             * dropdown
             */
            var dropdownBtn = $('.l-dropdown__btn');

            dropdownBtn.click(function () {
                $(this).parent('.l-dropdown-wrapper')
                    .toggleClass('is-open is-close');
            });
        }
    };
};