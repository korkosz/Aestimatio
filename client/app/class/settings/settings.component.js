class ctrl {
    constructor() {
    }

    removeSubject(_sub) {
        this.userClass.subjects
            .splice(this.userClass.subjects.indexOf(_sub), 1);
        this.userClass.$save();
    }

    addSubject(_sub) {
        this.userClass.subjects.push(_sub);
        this.userClass.$save();

        $('.m-modals__mask').removeClass('is-open');
        $('.m-modals__add-modal.is-open').removeClass('is-open').addClass('is-close');
        $('#m-modals-mask').remove();
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

    addGradeType(_type) {
        this.userClass.gradeTypes.push(_type);
        this.userClass.$save();

        $('.m-modals__mask').removeClass('is-open');
        $('.m-modals__add-modal.is-open').removeClass('is-open').addClass('is-close');
        $('#m-modals-mask').remove();
    }
}

module.exports = {
    templateUrl: '/static/app/class/settings/settings.template.html',
    controller: ctrl,
    bindings: {
        userClass: '='
    }
};