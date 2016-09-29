var routes = require('./user.routes');

module.exports = angular.module('aestimatio.user', [])
    .factory('userService', require('./user.service'))
    .component('userGrades', require('./grades/grades.component').grades)
    .directive('gradeModal', require('./grades/grades.component').modal)
    .component('userAverageGrade', require('./average_grade/average_grade.component'))
    .config(routes);

