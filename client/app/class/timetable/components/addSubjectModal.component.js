var component = {
    templateUrl: '/static/app/class/timetable/components/addSubjectModal.template.html',
    bindings: {
        userClass: '<',
        dayIndex: '<'
    },
    controller
};

function controller($scope, $timeout) {
    var vm = this;

    vm.$onInit = function () {
        vm.selectedSubject = null;

        $scope.$on('modalClosed', () => {
            $timeout(() => {
                vm.selectedSubject = null;
            }, 0);
        });
    };

    vm.removeSubject = function () {
        alert();
    };

    vm.pickSubject = function (subject) {
        vm.selectedSubject = subject;

        //close dropdown
        $('.l-dropdown-wrapper.is-open')
            .toggleClass('is-open is-close');
    };

    vm.addSubject = function (subject) {
        vm.userClass
            .timetable[vm.dayIndex].subjects.push(subject);
        vm.userClass.$save();

        //hide modal 
        $('#m-modals-mask').click();
    };
}

module.exports = component;