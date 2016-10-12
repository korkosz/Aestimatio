var countries = require('country-list')().getNames();

function controller($filter, $http) {
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
        vm.countries = [];

        if (!valid) return;

        vm.countries = $filter('filter')(countries, vm.countrySearch);
    };

    vm.handleCitySearch = function (valid) {
        vm.cities = [];

        if (!valid) return;

        $http.get('http://localhost:3000/api/city/wars/pl').then((res) => {
            vm.cities = res.data;
        });
        //vm.cities = $filter('filter')(cities, vm.citySearch);
    };
}

module.exports = {
    templateUrl: '/static/app/class/search/search.template.html',
    controller,
    bindings: {
        userClass: '<'
    }
};