var moment = require('moment');
var _ = require('lodash');

var component = {
    templateUrl: '/static/app/home/components/addExamModal.template.html',
    bindings: {
        userClass: '<',
        selectedDay: '<',
        hide: '<'
    },
    controller
};

function controller($scope, $timeout) {
    var vm = this;

    vm.$onInit = function () {
        vm.data = {
            selectedSubject: '',
            selectedType: null,
            description: ''
        };

        vm.displayDate = null;

        setupSubjects();

        $scope.$on('modalClosed', () => {
            $timeout(() => {
                vm.data = {};
            }, 0);
        });
    };

    vm.$onChanges = function (changeObj) {
        if (changeObj.selectedDay) {
            $timeout(() => {
                vm.displayDate = moment(
                    changeObj.selectedDay.currentValue);
                setupSubjects();
            }, 0);
        }
    };

    vm.pickSubject = function (subject) {
        vm.data.selectedSubject = subject;

        //close dropdown
        $('.l-dropdown-wrapper.is-open')
            .toggleClass('is-open is-close');
    };

    vm.pickExamType = function (type) {
        vm.data.selectedType = type;

        //close dropdown
        $('.l-dropdown-wrapper.is-open')
            .toggleClass('is-open is-close');
    };

    vm.addExam = function (data) {
        var userClassCopy = angular.copy(vm.userClass);

        userClassCopy
            .tests.push({
                subject: data.selectedSubject,
                date: vm.selectedDay,
                type: data.selectedType.name,
                description: data.description
            });
        userClassCopy.$update(() => {
            vm.userClass.tests.push({
                subject: data.selectedSubject,
                date: vm.selectedDay,
                type: data.selectedType.name,
                description: data.description
            });
        });

        //hide modal 
        document.body.click();
    };

    function setupSubjects() {
        var dayName = moment(vm.selectedDay).format('dddd');
        var timetableDay = vm.userClass.timetable.find((_timetableDay) => {
            return _timetableDay.day === dayName;
        });

        if (timetableDay) {
            vm.daySubjects = _.uniq(timetableDay.subjects);
        } else {
            vm.daySubjects = [];
        }
    }
}


//angular.module('aestimatio').component('addExamModal', component);
module.exports = component;