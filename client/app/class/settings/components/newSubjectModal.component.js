var component = {
    templateUrl: '/static/app/class/settings/components/newSubjectModal.template.html',
    bindings: {
        userClass: '<'
    },
    controller
};

function controller() {
    var vm = this;

    vm.addSubject = function (_sub) {
        vm.userClass.subjects.push(_sub);
        vm.userClass.$save();

        //hide modal 
        $('#m-modals-mask').click();
    };
}

module.exports = component;