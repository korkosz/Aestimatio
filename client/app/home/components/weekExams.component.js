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

            getExams(); 

            $scope.$watch(function () {
                return classService.UserClass.tests.length;
            }, function () {
                getExams();
            });

            $scope.$watch(() => vm.selectedDay, function () {
                getExams();
            });
        };

        function getExams() {
            var startOfTheWeek = vm._selectedDay
                .startOf('week');
            var endOfTheWeek = vm._selectedDay
                .startOf('week');

            vm.exams = classService.UserClass
                .tests.filter((exam) => {
                    return moment(exam.date)
                        .isBetween(startOfTheWeek, endOfTheWeek);
                });
        }
    }
};