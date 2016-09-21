var routes = require('./user.routes');

module.exports = angular.module('aestimatio.user', [])
    .component('userGrades', require('./grades/grades'))
    .config(routes);

