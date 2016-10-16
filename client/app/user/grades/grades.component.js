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

    vm.removeGrade = function (grade, subject) {
        var userCopy = angular.copy(userService.User);
        var gradeIdx = userCopy.grades.findIndex(_grade => {
            return _grade.subject === subject &&
                _grade.gradeType === grade.type &&
                _grade.value === grade.grade;
        });
        userCopy.grades.splice(gradeIdx, 1);
        userCopy.$update(() => {
            userService.User.grades.splice(gradeIdx, 1);
        });
    };

    vm.toggleMode = function (gradesPerSubjObj) {
        gradesPerSubjObj.edit = !gradesPerSubjObj.edit;
    };
}

module.exports = component;
