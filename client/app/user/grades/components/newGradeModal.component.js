
var component = {
    templateUrl: '/static/app/user/grades/components/newGradeModal.template.html',
    bindings: {
        gradeTypes: '<',
        subject: '@'
    },
    controllerAs: 'modalVm',
    controller
};

function controller($scope, $timeout, userService) {
    var vm = this;

    vm.$onInit = function () {
        vm.userData = userService.User;
        vm.grade = {};

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
    };

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
        document.body.click();
    };

    function clearModalData() {
        vm.grade.grade = '';
        vm.grade.type = null;
    }
}

module.exports = component;
