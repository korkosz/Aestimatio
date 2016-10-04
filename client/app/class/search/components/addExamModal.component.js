var component = {
    templateUrl: '/static/app/class/search/components/addExamModal.template.html',
    bindings: {
        userClass: '<',
        activeDay: '<'
    },
    controller
};

function controller($scope, $timeout) {
    var vm = this;

    vm.$onInit = function () {
        vm.data = {
            selectedSubject: '',
            selectedType: null,
            description: ''
        };

        $scope.$on('modalClosed', () => {
            $timeout(() => {
                vm.data = {};
            }, 0);
        });
    }; 

    vm.pickSubject = function (subject) {
        vm.data.selectedSubject = subject;

        //close dropdown
        $('.l-dropdown-wrapper.is-open')
            .toggleClass('is-open is-close');
    };

    vm.pickExamType = function (type) {
        vm.data.selectedType = type;

        //close dropdown
        $('.l-dropdown-wrapper.is-open')
            .toggleClass('is-open is-close');
    };

    vm.addExam = function (data) {
        // vm.userClass
        //     .timetable[vm.dayIndex].subjects.push(subject);
        // vm.userClass.$save();

        //hide modal 
        $('#m-modals-mask').click(); 
    };
}


//angular.module('aestimatio').component('addExamModal', component);
module.exports = component;