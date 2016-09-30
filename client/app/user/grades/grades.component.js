class ctrl {
    constructor($scope, userService, averageGradesService) {
        var vm = this;

        this.averageGradesService = averageGradesService;

        vm.formattedGrades = userService
            .getLoggedUserGrades();

        $scope.$watch(
            () => {
                return userService.User.grades.length;
            },
            () => {
                vm.formattedGrades = userService
                    .getLoggedUserGrades();
            });
    }

    averageLabel(grades) {
        return '(' + this.averageGradesService.averageLabel(grades) + ')';
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
            gradeTypes: '<',
            subject: '@'
        },
        bindToController: true,
        controllerAs: 'modalVm',
        controller($scope, $timeout, userService) {
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

            vm.addGrade = function (grade, gradeType) {
                var userDataCopy = angular.copy(vm.userData);

                userDataCopy.grades.push({
                    subject: vm.subject,
                    value: grade,
                    gradeType: gradeType
                });

                userService.UserRes.update({
                    id: vm.userData._id
                }, userDataCopy, () => {/*success*/
                    vm.userData.grades.push({
                        subject: vm.subject,
                        value: grade,
                        gradeType: gradeType
                    });
                });
                //hide modal 
                $('#m-modals-mask').click();
            };

            $scope.$on('modalClosed', () => {
                /**
                 * double $apply problem
                 * if it would be "$scope.$apply" then it would work for button click
                 * but it would fail for manual invoke of the button click from 
                 * angular function (addGrade in this case) - because this code is
                 * already in $apply phase and manual call to $scope.$apply would
                 * blow an error. $timeout is async and its will be called after first
                 * $apply phase and $timeout will call its own $apply at the end
                 */
                $timeout(() => {
                    clearModalData();
                }, 0);
            });

            function clearModalData() {
                vm.grade.grade = '';
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