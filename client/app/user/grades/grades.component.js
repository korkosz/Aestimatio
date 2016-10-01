class ctrl {
    constructor($scope, userService, averageGradesService) {
        var vm = this;

        this.averageGradesService = averageGradesService;

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
    }

    averageLabel(grades) {
        return '(' + this.averageGradesService.averageLabel(grades) + ')';
    }
}

module.exports = {
    controller: ctrl,
    templateUrl: '/static/app/user/grades/grades.template.html',
    bindings: {
        userClass: '='
    }
};
