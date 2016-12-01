
var component = {
    templateUrl: '/static/app/user/profile/components/newPasswordModal.template.html',
    controllerAs: 'modalVm',
    controller
};

function controller($scope, $timeout, auth) {
    var vm = this;

    vm.$onInit = function () {
        $scope.$on('modalClosed', () => {           
            //double $apply problem   
            $timeout(() => {
                clearModalData();
            }, 0);
        });
    };

    vm.changePassword = function (newPass) {
        auth.changePassword(newPass);

        //hide modal
        document.body.click();
    };

    function clearModalData() {
        vm.newPassword = '';
        vm.newPassword2 = '';
    }
}

module.exports = component;
