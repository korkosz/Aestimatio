var moment = require('moment');

var app = angular.module('ct.calendar', []);

app.directive('calendar', function () {
    return {
        require: 'ngModel',
        restrict: 'E',
        controller() { },
        controllerAs: 'calendarCtrl',
        link,
        templateUrl: '/static/components/calendar/calendar.html'
    };


    function link(scope, el, attrs, ngModelCtrl) {
        var vm = scope.calendarCtrl;

        /*** INIT ***/
        vm.daysArray = [];
        vm.calendarData = [];

        attrs.$observe('data', (val) => {
            vm.calendarData = scope.$eval(val) || [];
            generateDaysArray();
            refreshActiveDayData();
        });
        /// INIT ///


        /*** ngModelCtrl pipeline ***/
        ngModelCtrl.$formatters.push($modelValue => {
            vm.activeMonth = angular.copy($modelValue);
            return $modelValue;
        });

        ngModelCtrl.$formatters.push($modelValue => {
            vm.activeDay = angular.copy($modelValue);
            return $modelValue;
        });

        ngModelCtrl.$formatters.push($modelValue => {
            var isValidDate = moment($modelValue).isValid();
            if (isValidDate) return moment($modelValue);
            else return moment();
        });

        ngModelCtrl.$render = function () {
            generateDaysArray();
        };

        ngModelCtrl.$parsers.push($viewValue => {
            return $viewValue;
        });

        vm.setViewValue = function (val) {
            ngModelCtrl.$setViewValue(val);
        };
        /// ngModelCtrl pipeline /// 


        /*** Private API ***/
        vm.pickDay = function (day) {
            const activeMonth = vm.activeMonth.month();
            const activeYear = vm.activeMonth.year();

            vm.activeDay.year(activeYear)
                .month(activeMonth)
                .date(day.day);
            vm.activeDay.data = day.data;

            vm.setViewValue(vm.activeDay);
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

        vm.isWeekend = function (day) {
            var clone = moment(vm.activeMonth);
            clone.date(day);
            return clone.day() === 6 || clone.day() === 0;
        };

        vm.isToday = function (day) {
            var clone = moment(vm.activeMonth);
            clone.date(day);
            return moment().isSame(clone, 'd');
        };

        vm.getActiveMonthName = function () {
            return vm.activeMonth.format('MMMM');
        };

        vm.getActiveYear = function () {
            return vm.activeMonth.format('YYYY');
        };

        /**
         * Use this method when your data source,
         * month or ng-model(externally) changes.
         */
        function generateDaysArray() {
            const firstDay = 1;
            const lastDay = vm.activeMonth.endOf('month').date();

            var nbOfDaysToPrepend = 0;
            var nbOfDaysToAppend = 0;

            var dataForCurrMonth = getDataForCurrMonth();

            //1 clear
            vm.daysArray.length = 0;

            //2 prepend
            nbOfDaysToPrepend = calcNbOfDaysToPrepend();

            while (nbOfDaysToPrepend--) {
                vm.daysArray.push(null);
            }

            //3 generate
            for (let i = firstDay; i <= lastDay; i++) {
                let dataForCurrDay = dataForCurrMonth
                    .filter((_data) => {
                        let day = moment(_data.date).date();
                        return day === i;
                    });

                vm.daysArray.push({
                    day: i,
                    data: dataForCurrDay.length > 0 ? dataForCurrDay : null
                });
            }

            //4 append
            nbOfDaysToAppend = calcNbOfDaysToAppend();
            while (nbOfDaysToAppend--) {
                vm.daysArray.push(null);
            }
        }

        function getDataForCurrMonth() {
            var monthStart = vm.activeMonth
                .startOf('month').valueOf();
            var monthEnd = vm.activeMonth
                .endOf('month').valueOf();

            return vm.calendarData.filter(_data => {
                return _data.date <= monthEnd &&
                    _data.date >= monthStart;
            });
        }

        function refreshActiveDayData() {
            vm.activeDay.data = vm.calendarData.filter((_data) => {
                return moment(_data.date).diff(vm.activeDay, 'days') === 0;
            });
        }

        function calcNbOfDaysToPrepend() {
            var weekDay = vm.activeMonth.startOf('month').day();

            return weekDay === 0 ? 6 : weekDay - 1;
        }

        function calcNbOfDaysToAppend() {
            var weekDay = vm.activeMonth.endOf('month').day();

            return weekDay === 0 ? 0 : 7 - weekDay;
        }
        function monthChanged() {
            generateDaysArray();
        }
    }
});

module.exports = app;