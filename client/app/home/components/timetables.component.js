var moment = require('moment');

module.exports = {
    templateUrl: '/static/app/home/components/timetables.template.html',
    bindings: {
        selectedDay: '<?'
    },
    controller($scope, classService) {
        var vm = this;

        vm.$onInit = function () {
            $scope.$watch(() => vm.selectedDay, function () {
                setUpTimetables();
            });
        };

        vm.anyExamsForSubject = function (day, subject) {
            return classService.UserClass.tests.some((exam) => {
                return exam.subject === subject &&
                    moment(exam.date).isSame(day, 'd');
            });
        };

        function setUpTimetables() {
            vm.currentDay = moment(vm.selectedDay);
            vm.nextDay = vm.currentDay.clone().add(1, 'd');
            vm.previousDay = vm.currentDay.clone().subtract(1, 'd');

            vm.currentDayTT = classService.UserClass.timetable
                .find((day) => {
                    return day.day.toLowerCase() ===
                        vm.currentDay.format('dddd').toLowerCase();
                });
            vm.nextDayTT = classService.UserClass.timetable
                .find((day) => {
                    return day.day.toLowerCase() ===
                        vm.nextDay.format('dddd').toLowerCase();
                });
            vm.previousDayTT = classService.UserClass.timetable
                .find((day) => {
                    return day.day.toLowerCase() ===
                        vm.previousDay.format('dddd').toLowerCase();
                });
        }
    }
};