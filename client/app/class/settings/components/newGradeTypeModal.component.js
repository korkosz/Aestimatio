var component = {
    templateUrl: '/static/app/class/settings/components/newGradeTypeModal.template.html',
    bindings: {
        userClass: '<'
    },
    controller
};

function controller() {
    var vm = this;

    vm.addGradeType = function(_type) {
        vm.userClass.gradeTypes.push(_type);
        vm.userClass.$save();

        //hide modal 
        $('#m-modals-mask').click();
    };
}

module.exports = component;