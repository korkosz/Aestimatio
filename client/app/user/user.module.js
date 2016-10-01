var routes = require('./user.routes');

module.exports = angular.module('aestimatio.user', [])
    .factory('userService', require('./user.service'))
    .factory('averageGradesService', require('./average_grade/average_grade.service'))
    .component('userGrades', require('./grades/grades.component'))
    .component('newGradeModal', require('./grades/components/newGradeModal.component'))
    .component('userAverageGrade', require('./average_grade/average_grade.component'))
    .config(routes);

