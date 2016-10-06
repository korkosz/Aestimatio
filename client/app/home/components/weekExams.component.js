var moment = require('moment');

module.exports = {
    templateUrl: '/static/app/home/components/weekExams.template.html',
    bindings: {
        selectedDay: '<?'
    },
    controller($scope, classService) {
        var vm = this;

        vm.$onInit = function () {
            vm._selectedDay = moment(vm.selectedDay);
            vm.weekDays = [];
            getExams();
            combineWeekDaysAndExams();

            $scope.$watch(function () {
                return classService.UserClass.tests.length;
            }, function () {
                getExams();
                combineWeekDaysAndExams();
            });

            $scope.$watch(() => vm.selectedDay, function () {
                vm._selectedDay = moment(vm.selectedDay);
                getExams();
                combineWeekDaysAndExams();
            });
        };

        function combineWeekDaysAndExams() {
            const weekDaysNames = ['Monday', 'Tuesday',
                'Wednesday', 'Thursday', 'Friday'];

            vm.weekDays.length = 0;

            for (let i = 0; i < 5; i++) {
                vm.weekDays.push({
                    name: weekDaysNames[i],
                    exams: examsForDay(i + 1)
                });
            }
        }

        function examsForDay(dayIdx) {
            //exams are already filtered for this week
            return vm.exams.filter((ex) => {
                return moment(ex.date).day() === dayIdx;
            });
        }

        function getExams() {
            var startOfTheWeek = moment(vm._selectedDay)
                .startOf('week');
            var endOfTheWeek = moment(vm._selectedDay)
                .endOf('week');

            vm.exams = classService.UserClass
                .tests.filter((exam) => {
                    return moment(exam.date)
                        .isBetween(startOfTheWeek, endOfTheWeek);
                });
        }
    }
};