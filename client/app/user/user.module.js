var routes = require('./user.routes');

module.exports = angular.module('aestimatio.user', [])
    .component('userGrades', require('./grades/grades.component'))
    .component('userAverageGrade', require('./average_grade/average_grade.component'))
    .config(routes);

