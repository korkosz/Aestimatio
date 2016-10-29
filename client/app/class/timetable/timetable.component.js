var component = {
    templateUrl: '/static/app/class/timetable/timetable.template.html',
    controller,
    bindings: {
        userClass: '='
    }
};

function controller() {
    var vm = this;

    vm.dropHandler = function (e) { 
        var eventData = e.originalEvent.dataTransfer.getData('text/plain').split(' ');
        var target = e.currentTarget;
        var dropDayIdx = target.dataset.dayIndex;
        var sourceDayIdx = eventData[1];
        var sourceSubjectIdx = eventData[0];        

        if (sourceDayIdx !== dropDayIdx) return;

        var userClassCopy = angular.copy(vm.userClass);

        var draggedSubj = userClassCopy.timetable[sourceDayIdx].subjects
            .splice(sourceSubjectIdx, 1)[0];

        userClassCopy.timetable[sourceDayIdx].subjects
            .splice(target.dataset.subjectIndex, 0, draggedSubj);
   
        userClassCopy.$update(function () {
            var draggedSubj = vm.userClass.timetable[sourceDayIdx].subjects
                .splice(sourceSubjectIdx, 1)[0];

            vm.userClass.timetable[sourceDayIdx].subjects
                .splice(target.dataset.subjectIndex, 0, draggedSubj);
        }); 
    }; 
  
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

//dsadad
