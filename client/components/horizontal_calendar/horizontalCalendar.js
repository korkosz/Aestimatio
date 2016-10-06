var moment = require('moment');

module.exports = angular.module('ct.horizontalCalendar', [])
    .component('horizontalCalendar', {
        templateUrl: '/static/components/horizontal_calendar/horizontalCalendar.html',
        bindings: {
            number: '<',
            selectedDay: '='
        },
        controller() {
            var vm = this;

            vm.$onInit = function () {
                vm.selectedDay = moment();
                vm.beforeDays = [];
                vm.afterDays = [];

                vm.number = vm.number || 4;

                setUpDays();
            };

            vm.nextDay = function () {
                vm.selectedDay.add(1, 'd');
                setUpDays();
            };

            vm.previousDay = function () {
                vm.selectedDay.subtract(1, 'd');
                setUpDays();
            };

            function setUpDays() {
                vm.day = vm.selectedDay.valueOf();
                prependDays();
                appendDays();
            }

            function prependDays() {
                vm.beforeDays.length = 0;
                for (let i = vm.number; i > 0; i--) {
                    let selectedDayCopy = moment(vm.selectedDay).subtract(i, 'd');
                    vm.beforeDays.push({
                        day: selectedDayCopy.date(),
                        weekend: selectedDayCopy.day() === 0 ||
                        selectedDayCopy.day() === 6
                    });
                }
            }

            function appendDays() {
                vm.afterDays.length = 0;
                for (let i = 1; i <= vm.number; i++) {
                    let selectedDayCopy = moment(vm.selectedDay).add(i, 'd');
                    vm.afterDays.push({
                        day: selectedDayCopy.date(),
                        weekend: selectedDayCopy.day() === 0 ||
                        selectedDayCopy.day() === 6
                    });
                }
            }
        }
    });