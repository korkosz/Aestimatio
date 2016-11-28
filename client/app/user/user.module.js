module.exports = angular.module('aestimatio.user', [])
    .factory('userService', require('./user.service'))
    .factory('averageGradesService', require('./average_grade/average_grade.service'))
    .component('profile', require('./profile/profile.component'))
    .component('userGrades', require('./grades/grades.component'))
    .component('newGradeModal', require('./grades/components/newGradeModal.component'))
    .component('newPasswordModal', require('./profile/components/newPasswordModal.component'))
    .component('userAverageGrade', require('./average_grade/average_grade.component'))
    .config(require('./user.states'));

