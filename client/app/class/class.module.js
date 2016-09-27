module.exports = angular
    .module('aestimatio.class', [])
    .factory('classService', require('./class.service.js'))
    .component('classSearch', require('./search/search.component.js'))
    .component('classSettings', require('./settings/settings.component.js'))
    .component('classTimetable', require('./timetable/timetable.component.js'))
    .config(require('./class.routes'));