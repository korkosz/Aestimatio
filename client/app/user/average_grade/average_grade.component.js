class ctrl {
    constructor($scope, averageGradesService, userService) {
        var vm = this;
        
        vm.averageGradesService = averageGradesService;

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
        var gradesSum = [];
        grades.forEach((gradesContainer) => {
            gradesSum = gradesSum.concat(gradesContainer.grades);
        });
        return this.averageGradesService.averageLabel(gradesSum);
    }
}

module.exports = {
    controller: ctrl,
    templateUrl: '/static/app/user/average_grade/average_grade.template.html'
};