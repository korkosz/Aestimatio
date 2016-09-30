class ctrl {
    constructor(userService) {
        this.formattedGrades = userService
            .getLoggedUserGrades();
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
        controller($scope, userService) {
            var vm = this;

            vm.userData = userService.User;

            vm.grade = {};

            vm.pickType = function (type) {
                vm.grade.type = type;
                $('.l-dropdown-wrapper.is-open')
                    .toggleClass('is-open is-close');
            };

            vm.gradeTypeLabel = function () {
                return `${vm.grade.type.name} [ rate: ${vm.grade.type.rate} ]`;
            };

            vm.addGrade = function () {
                var userDataCopy = angular.copy(vm.userData);
                userService.UserRes.update({ id: vm.userData._id }, userDataCopy);
                //hide modal 
                $('#m-modals-mask').click();
                clearModalData();
            };

            $scope.$on('modalClosed', () => {
                clearModalData();
                $scope.$apply();
            });

            function clearModalData() {
                vm.grade.name = '';
                vm.grade.type = null;
            }
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

                    //hide dropdown
                    el.find('.l-dropdown-wrapper')
                        .addClass('is-close')
                        .removeClass('is-open');

                    scope.$emit('modalClosed');
                });
            });


            /**
             * dropdown
             */
            var dropdownBtn = el.find('.l-dropdown__btn');

            dropdownBtn.click(function () {
                $(this).parent('.l-dropdown-wrapper')
                    .toggleClass('is-open is-close');
            });
        }
    };
};