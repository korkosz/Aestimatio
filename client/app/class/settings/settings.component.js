class ctrl {
    removeSubject(_sub) {
        this.userClass.subjects
            .splice(this.userClass.subjects.indexOf(_sub), 1);
        this.userClass.$save();
    }

    removeModerator(_modId) {
        var userClassCopy = angular.copy(this.userClass);
        const modIdx = userClassCopy.moderators
            .indexOf(_modId);
        
        userClassCopy.moderators 
            .splice(modIdx, 1);
        userClassCopy.$update(() => {
            this.userClass.moderators
                .splice(modIdx, 1);
        });
    }

    getModeratorName(_modId) {
        var user = this.userClass.students.find((_usr) => {
            return _usr._id === _modId;
        });
        return user && user.name;
    }

    subjectUsedInTimetable(_sub) {
        return this.userClass.timetable.findIndex((day) => {
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