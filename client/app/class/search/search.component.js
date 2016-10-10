
function controller($scope) {
    var vm = this;

    vm.$onInit = function () {
        vm.countries = [];
        vm.cities = [];
        vm.schools = [];
        vm.classes = [];

        vm.countrySearch = '';
        vm.citySearch = '';
        vm.schoolSearch = '';
        vm.classSearch = '';

        vm.country = null;
        vm.city = null;
        vm.school = null;
        vm.class = null;
    };

    vm.handleCountrySearch = function (valid) {
        console.log(valid);
    };
}

module.exports = {
    templateUrl: '/static/app/class/search/search.template.html',
    controller,
    bindings: {
        userClass: '<'
    }
};