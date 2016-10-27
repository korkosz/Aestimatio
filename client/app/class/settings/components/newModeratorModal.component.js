var component = {
    templateUrl: '/static/app/class/settings/components/newModeratorModal.template.html',
    bindings: {
        userClass: '<'
    },
    controller
};

function controller($scope, $timeout, $filter) {
    var vm = this;

    vm.$onInit = function () {
        $scope.$on('modalClosed', () => {
            $timeout(() => {
                vm.student = null;
                vm.search = '';
                $scope.searchForm.$setPristine();
            }, 0);
        });

        vm.studentsInClass = [{
            _id: '1',
            name: 'Mateusz Korkosz'
        },
        {
            _id: '2',
            name: 'Maciej Chmiel'
        },
        {
            _id: '3',
            name: 'Marcin Trybulec'
        }];
    };

    vm.addModerator = function (_student) {


        //hide modal 
        document.body.click();
    };

    vm.pickStudent = function (student, e) {
        vm.student = student;
        vm.search = student.name;

        //close dropdown but not the modal 
        e.stopPropagation();
        $('.l-dropdown__input-wrapper.is-open').click();
    };

    vm.dropdownDisabled = function() {
        return $filter('filter')(
            vm.studentsInClass, vm.search).length === 0;
    };

    vm.handleStudentSearch = function (valid) {
        if (!valid) {
            //close dropdown but not the modal 
            $('.l-dropdown__input-wrapper.is-open').click();
            return;
        }

        setTimeout(() => {
            document.querySelector('#studentBtn.l-dropdown__btn')
                .click();
        }, 0);

    };
}

module.exports = component;