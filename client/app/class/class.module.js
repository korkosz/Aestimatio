module.exports = angular
    .module('aestimatio.class', [])
    .factory('classService', require('./class.service.js'))
    .component('classSearch', require('./search/search.component.js'))    
    .component('classSettings', require('./settings/settings.component.js'))
    .component('newSubjectModal', require('./settings/components/newSubjectModal.component.js'))
    .component('newGradeTypeModal', require('./settings/components/newGradeTypeModal.component.js'))
    .component('classTimetable', require('./timetable/timetable.component.js'))
    .component('addSubjectModal', require('./timetable/components/addSubjectModal.component.js'))
    .config(require('./class.routes'));