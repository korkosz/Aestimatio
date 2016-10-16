var moment = require('moment');

var app = angular.module('aestimatio.home', []);

app.component('home', {
    templateUrl: '/static/app/home/home.template.html',
    bindings: {
        userClass: '<'
    },
    controller() {
        var vm = this;
        vm.selectedDay = (new Date()).getTime();

        vm.addExamsHidden = function() {
            return vm.isWeekend() || isInThePast();
        };

        vm.isWeekend = function() {
            var date = moment(vm.selectedDay);
            return date.day() === 6 ||
                date.day() === 0;
        };

        function isInThePast() {
            return moment().isAfter(moment(vm.selectedDay), 'day');
        }
    }
});
app.component('addExamModal',
    require('./components/addExamModal.component.js'));
app.component('weekExams',
    require('./components/weekExams.component.js'));
app.component('timetables',
    require('./components/timetables.component.js'));

module.exports = app;