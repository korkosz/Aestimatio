class ctrl {
    constructor() {
    }

    remove(_sub) {
        this.userClass.subjects
            .splice(this.userClass.subjects.indexOf(_sub), 1);
        this.userClass.$save();
    }

    add(_sub) {
        this.userClass.subjects.push(_sub);
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