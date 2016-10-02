var component = {
    templateUrl: '/static/app/class/timetable/timetable.template.html',
    controller,
    bindings: {
        userClass: '='
    }
};

function controller() {
    var vm = this;

    vm.removeSubject = function (e, dayIdx, subjIdx) {
        e.preventDefault();
        e.stopPropagation(); //stop dropdown

        var userClassCopy = angular.copy(vm.userClass);

        userClassCopy.timetable[dayIdx].subjects
            .splice(subjIdx, 1);

        userClassCopy.$update(function () {
            vm.userClass.timetable[dayIdx].subjects
                .splice(subjIdx, 1);
        });
    };

    vm.replaceSubject = function (dayIdx, originalSubjectIdx, newSubj) {
        vm.userClass.timetable[dayIdx].subjects
            .splice(originalSubjectIdx, 1, newSubj);
        vm.userClass.$save();

        //close dropdown
        $('.l-dropdown-wrapper.is-open')
            .toggleClass('is-open is-close');
    };
}

module.exports = component;