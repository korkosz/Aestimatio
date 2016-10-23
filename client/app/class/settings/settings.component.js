class ctrl {
    removeSubject(_sub) {
        this.userClass.subjects
            .splice(this.userClass.subjects.indexOf(_sub), 1);
        this.userClass.$save();
    }

    subjectUsedInTimetable(_sub) {
        return this.userClass.timetable.findIndex((day)=> {
            return day.subjects.indexOf(_sub) !== -1;
        }) !== -1;
    }
}

module.exports = {
    templateUrl: '/static/app/class/settings/settings.template.html',
    controller: ctrl,
    bindings: {
        userClass: '='
    }
};