var component = {
    templateUrl: '/static/app/class/timetable/timetable.template.html',
    controller,
    bindings: {
        userClass: '='
    }
};

function controller() {
    var vm = this;

    //
    setTimeout(function () {
        var xs = document.querySelectorAll('.l-dropdown-wrapper');
        xs.forEach((x) => {
            x.addEventListener('dragstart', handleDragStart, false);
            x.addEventListener('dragover', handleDragOver, false);
            x.addEventListener('drop', drop_handler, false);
            x.addEventListener('dragleave', handleDragLeave, false);

        });
    }, 1000);

    function handleDragLeave() {
        this.classList.remove('is-drag-over');
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', this.dataset.subjectIndex + ' ' + this.dataset.dayIndex);
        this.classList.add('is-drag');
    }

    function handleDragOver(e) {
        e.preventDefault();
        // Set the dropEffect to move
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('is-drag-over');
    }

    function drop_handler(e) {
        e.preventDefault();

        var that = this;
 
        var eventData = e.dataTransfer.getData('text/plain').split(' ');
        var dropDayIdx = that.dataset.dayIndex;
        var sourceDayIdx = eventData[1];
        var sourceSubjectIdx = eventData[0];
        var dropdown = document.querySelector('.l-dropdown-wrapper.is-drag');

        e.dataTransfer.dropEffect = 'move';
        that.classList.remove('is-drag-over');
        dropdown.classList.remove('is-drag');

        if (sourceDayIdx !== dropDayIdx) return;

        var userClassCopy = angular.copy(vm.userClass);

        var draggedSubj = userClassCopy.timetable[sourceDayIdx].subjects
            .splice(sourceSubjectIdx, 1)[0];

        userClassCopy.timetable[sourceDayIdx].subjects
            .splice(that.dataset.subjectIndex, 0, draggedSubj);

        userClassCopy.$update(function () {
            var draggedSubj = vm.userClass.timetable[sourceDayIdx].subjects
                .splice(sourceSubjectIdx, 1)[0];

            vm.userClass.timetable[sourceDayIdx].subjects
                .splice(that.dataset.subjectIndex, 0, draggedSubj);
        });
    }

    //

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
