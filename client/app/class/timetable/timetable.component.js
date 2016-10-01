var component = {
    templateUrl: '/static/app/class/timetable/timetable.template.html',
    controller,
    bindings: {
        userClass: '='
    }
};

function controller() {
    var vm = this;

    vm.replaceSubject = function(dayIdx, originalSubjectIdx, newSubj) {
        vm.userClass.timetable[dayIdx].subjects
            .splice(originalSubjectIdx, 1, newSubj);

        //close dropdown
        $('.l-dropdown-wrapper.is-open')
            .toggleClass('is-open is-close');
    };    
}

module.exports = component;