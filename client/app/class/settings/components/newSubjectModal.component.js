var component = {
    templateUrl: '/static/app/class/settings/components/newSubjectModal.template.html',
    bindings: {
        userClass: '<'
    },
    controller
};

function controller($scope, $timeout) {
    var vm = this;

    vm.$onInit = function () {
        $scope.$on('modalClosed', () => {
            $timeout(() => {
                $scope.newSubject = '';
            }, 0);
        });
    };

    vm.addSubject = function (_sub) {
        vm.userClass.subjects.push(_sub);
        vm.userClass.$save();

        //hide modal 
        document.body.click();
    };
}

module.exports = component;