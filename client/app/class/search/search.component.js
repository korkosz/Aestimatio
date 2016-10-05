var moment = require('moment');

function controller($scope) {
    var vm = this;

    vm.$onInit = function () {
        vm.activeDay = moment();
        vm.activeMonth = moment();
        vm.exams = vm.userClass.tests;
        vm.weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        vm.daysArray = [];
        generateDaysArray();

        $scope.$watch(() => {
            return vm.userClass.tests.length;
        }, () => {
            generateDaysArray();
        });
    };

    vm.pickDay = function (day) {
        const activeMonth = vm.activeMonth.month();
        const activeYear = vm.activeMonth.year();

        vm.activeDay.year(activeYear)
            .month(activeMonth)
            .date(day);
    };

    vm.prevMonth = function () {
        vm.activeMonth.subtract(1, 'M');
        monthChanged();
    };

    vm.nextMonth = function () {
        vm.activeMonth.add(1, 'M');
        monthChanged();
    };

    vm.isDayActive = function (day) {
        return vm.activeDay.date() === day &&
            vm.activeDay.month() === vm.activeMonth.month();
    };

    vm.getActiveMonthName = function () {
        return vm.activeMonth.format('MMMM');
    };

    vm.getActiveYear = function () {
        return vm.activeMonth.format('YYYY');
    };

    function getExamsForCurMonth() {
        var monthStart = vm.activeMonth.startOf('month').valueOf();
        var monthEnd = vm.activeMonth.endOf('month').valueOf();

        return vm.exams.filter(ex => {
            return ex.date <= monthEnd &&
                ex.date >= monthStart;
        });
    }

    function monthChanged() {
        generateDaysArray();
    }

    function generateDaysArray() {
        const firstDay = 1;
        const lastDay = vm.activeMonth.endOf('month').date();

        var nbOfDaysToPrepend = 0;
        var nbOfDaysToAppend = 0;

        var examsForCurrMonth = getExamsForCurMonth();

        //1 clear
        vm.daysArray.length = 0;

        //2 prepend
        nbOfDaysToPrepend = calcNbOfDaysToPrepend();

        while (nbOfDaysToPrepend--) {
            vm.daysArray.push(null);
        }

        //3 generate
        for (let i = firstDay; i <= lastDay; i++) {
            let examsForCurrDay = [];
            examsForCurrMonth.forEach((ex, idx) => {
                let day = moment(ex.date).date();

                if (day === i) {
                    examsForCurrDay.push(examsForCurrMonth.splice(idx, 1));
                }
            });

            vm.daysArray.push({
                day: i,
                exams: examsForCurrDay.length > 0 ? examsForCurrDay : null
            });
        }

        //4 append
        nbOfDaysToAppend = calcNbOfDaysToAppend();
        while (nbOfDaysToAppend--) {
            vm.daysArray.push(null);
        }
    }

    function calcNbOfDaysToPrepend() {
        var weekDay = vm.activeMonth.startOf('month').day();

        return weekDay === 0 ? 6 : weekDay - 1;
    }

    function calcNbOfDaysToAppend() {
        var weekDay = vm.activeMonth.endOf('month').day();

        return weekDay === 0 ? 0 : 7 - weekDay;
    }
}

module.exports = {
    templateUrl: '/static/app/class/search/search.template.html',
    controller,
    bindings: {
        userClass: '<'
    }
};