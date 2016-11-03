module.exports = {
    templateUrl: '/static/app/auth/register/register.template.html',
    controller($scope, $http, $state) {
        var vm = this;

        vm.register = function (invalid) {
            if (invalid) return;

            $http.post('/auth/register', {
                email: $scope.email,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                password: $scope.password
            }).then(() => {
                $state.go('auth.search');
            });
        };
    }
};
