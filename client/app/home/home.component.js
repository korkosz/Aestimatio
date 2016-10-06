var app = angular.module('aestimatio.home',[]);

app.component('home', {
    templateUrl: '/static/app/home/home.template.html',
    bindings: {
        userClass: '<'
    }, 
    controller() {
        var vm = this;
        vm.selectedDay = (new Date()).getTime();
    }
});
app.component('addExamModal', 
    require('./components/addExamModal.component.js'));
app.component('weekExams', 
    require('./components/weekExams.component.js'));
app.component('timetables', 
    require('./components/timetables.component.js'));

module.exports = app;