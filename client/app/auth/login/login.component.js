var component = {
    templateUrl: '/static/app/auth/login/login.template.html',
    controller($state, auth) {
        var vm = this;
        
        vm.logIn = function (invalid) {
            if (invalid) return;

            auth.logIn(vm.email, vm.password, vm.remember).then(() => {
                $state.go('auth.authClass.home');
            }, (response) => {
                if (response.status === 401) {
                    vm.invalidCredentials = true;
                }
            });
        };
    }
};

module.exports = component;