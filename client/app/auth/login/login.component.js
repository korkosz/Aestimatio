var component = {
    templateUrl: '/static/app/auth/login/login.template.html',
    controller($state, auth) {
        var vm = this;

        vm.logIn = function () {
            auth.logIn(vm.username, vm.password, vm.remember);
            auth.waitForUser().then(()=> {
                $state.go('user.home');
            });            
        };
    }
};

module.exports = component;