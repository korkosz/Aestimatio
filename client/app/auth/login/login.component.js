var component = {
    templateUrl: '/static/app/auth/login/login.template.html',
    controller($state, $scope, auth) {
        var vm = this;

        vm.logIn = function (invalid) {
            if (invalid) return;

            auth.logIn(vm.email, vm.password, vm.remember).then(() => {
                $state.go('auth.authClass.home');
            }, (response) => {
                if (response.status === 401) {
                    $scope.loginForm.email.$setValidity('credentials', false);
                    $scope.loginForm.password.$setValidity('credentials', false);
                }
            });
        };

        vm.handleChange = function () {
            $scope.loginForm.email.$setValidity('credentials', true);
            $scope.loginForm.password.$setValidity('credentials', true);
        };

        vm.invalidCredentials = function () {
            return $scope.loginForm.email.$error.credentials
                || $scope.loginForm.password.$error.credentials;
        };
    }
};

module.exports = component;