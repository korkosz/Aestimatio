var component = {
    templateUrl: '/static/app/auth/login/login.template.html',
    controller($state, auth) {
        var vm = this;

        vm.logIn = function () {
            auth.logIn(vm.username, vm.password, vm.remember).then(() => {
                console.info('1');
                $state.go('user.home');
            }, () => {
                console.info('2');
            });
        };
    }
};

module.exports = component;