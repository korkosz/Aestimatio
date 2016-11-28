
var component = {
    templateUrl: '/static/app/user/profile/components/newPasswordModal.template.html',
    controllerAs: 'modalVm',
    controller
};

function controller($scope, $timeout) {
    var vm = this;

    vm.$onInit = function () {
        $scope.$on('modalClosed', () => {           
            //double $apply problem   
            $timeout(() => {
                clearModalData();
            }, 0);
        });
    };

    vm.addGrade = function () {
        //hide modal
        document.body.click();
    };

    function clearModalData() {
        vm.password = '';
        vm.newPassword = '';
        vm.newPassword2 = '';
    }
}

module.exports = component;
