var component = {
    templateUrl: '/static/app/account/login/login.template.html',
    controller($location, auth) {
        var vm = this;

        vm.logIn = function () {
            auth.logIn(vm.username, vm.password, vm.remember);
            auth.waitForUser().then(()=> {
                $location.path('/home');
            });            
        };
    }
};

module.exports = component;