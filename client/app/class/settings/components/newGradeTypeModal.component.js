var component = {
    templateUrl: '/static/app/class/settings/components/newGradeTypeModal.template.html',
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
                $scope.type = null;
            }, 0);
        });
    };

    vm.addGradeType = function (_type) {
        vm.userClass.gradeTypes.push(_type);
        vm.userClass.$save();

        //hide modal 
        $('#m-modals-mask').click();
    };
}

module.exports = component;