class ctrl {
    constructor(averageGradesService, userService) {
        this.averageGradesService = averageGradesService;

        this.formattedGrades = userService
            .getLoggedUserGrades();
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