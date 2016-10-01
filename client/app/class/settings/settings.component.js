class ctrl {
    removeSubject(_sub) {
        this.userClass.subjects
            .splice(this.userClass.subjects.indexOf(_sub), 1);
        this.userClass.$save();
    }

    removeGradeType(_type) {
        var typeIdx = this.userClass.gradeTypes.findIndex((gradeType) => {
            return _type.name === gradeType.name;
        });
        if (typeIdx === -1) return;

        this.userClass.gradeTypes
            .splice(typeIdx, 1);
        this.userClass.$save();
    }
}

module.exports = {
    templateUrl: '/static/app/class/settings/settings.template.html',
    controller: ctrl,
    bindings: {
        userClass: '='
    }
};