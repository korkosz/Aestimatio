var moment = require('moment');

module.exports = angular.module('ct.horizontalCalendar', [])
    .component('horizontalCalendar', {
        templateUrl: '/static/components/horizontal_calendar/horizontalCalendar.html',
        bindings: {
            number: '<',
            selectedDay: '=?'
        },
        controller() {
            var vm = this;

            vm.$onInit = function () {
                vm._selectedDay = moment();
                vm.beforeDays = [];
                vm.afterDays = [];

                vm.number = vm.number || 4;

                setUpDays();
            };

            vm.nextDay = function () {
                vm._selectedDay.add(1, 'd');
                setUpDays();
            };

            vm.previousDay = function () {
                vm._selectedDay.subtract(1, 'd');
                setUpDays();
            };

            vm.addDays = function (number) {
                vm._selectedDay.add(number, 'd');
                setUpDays();
            };

            vm.removeDays = function (number) {
                vm._selectedDay.subtract(number, 'd');
                setUpDays();
            };

            vm.isToday = function (day) {
                var dayMomentObj = moment()
                    .date(day.day)  
                    .month(day.month)
                    .year(day.year);

                return moment().isSame(
                    moment(dayMomentObj), 'd');
            };

            function setUpDays() {
                vm.selectedDay = vm._selectedDay.valueOf();
                prependDays();
                appendDays();
            }

            function prependDays() {
                vm.beforeDays.length = 0;
                for (let i = vm.number; i > 0; i--) {
                    let selectedDayCopy = moment(vm._selectedDay).subtract(i, 'd');
                    vm.beforeDays.push({
                        day: selectedDayCopy.format('DD'),
                        month: selectedDayCopy.month(),
                        year: selectedDayCopy.year(),
                        weekend: selectedDayCopy.day() === 0 ||
                        selectedDayCopy.day() === 6
                    });
                }
            }

            function appendDays() {
                vm.afterDays.length = 0;
                for (let i = 1; i <= vm.number; i++) {
                    let selectedDayCopy = moment(vm._selectedDay).add(i, 'd');
                    vm.afterDays.push({
                        day: selectedDayCopy.format('DD'),
                        month: selectedDayCopy.month(),
                        year: selectedDayCopy.year(),
                        weekend: selectedDayCopy.day() === 0 ||
                        selectedDayCopy.day() === 6
                    });
                }
            }
        }
    });
