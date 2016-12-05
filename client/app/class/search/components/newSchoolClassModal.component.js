
var component = {
    templateUrl: '/static/app/class/search/components/newSchoolClassModal.template.html',
    bindings: {
        entityName: '@',
        addEntity: '&'
    },
    controllerAs: 'modalVm',
    controller
};

function controller($scope, $timeout) {
    var vm = this;

    vm.$onInit = function () {
        $scope.$on('modalClosed', () => {           
            //double $apply problem   
            $timeout(() => {
                clearModalData();
            }, 0);
        });
    };

    vm.add = function (name) {
        
        vm.addEntity({name: name});

        //hide modal
        document.body.click();
    };

    function clearModalData() {
        vm.name = '';
    }
}

module.exports = component;
