var component = {
    templateUrl: '/static/app/auth/login/login.template.html',
    controller($state, auth) {
        var vm = this;

        vm.logIn = function () {
            auth.logIn(vm.email, vm.password, vm.remember).then(() => {
                $state.go('auth.authClass.home');
            });
        };
    }
};

module.exports = component;