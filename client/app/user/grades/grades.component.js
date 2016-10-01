var component = {
    controller,
    templateUrl: '/static/app/user/grades/grades.template.html',
    bindings: {
        userClass: '='
    }
};

function controller($scope, userService, averageGradesService) {
    var vm = this;

    vm.$onInit = function () {
        vm.formattedGrades = userService
            .getLoggedUserGrades();

        $scope.$watch(
            () => {
                return userService.User.grades.length;
            },
            () => {
                vm.formattedGrades = userService
                    .getLoggedUserGrades();
            });
    };

    vm.averageLabel = function (grades) {
        return '(' + averageGradesService.averageLabel(grades) + ')';
    };
}

module.exports = component;
