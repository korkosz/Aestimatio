var countries = require('country-list')();
var countriesNames = countries.getNames();


function controller($filter, $http) {
    var vm = this;
    var schools = [];
    var classes = [];

    vm.$onInit = function () {
        vm.countries = [];
        vm.cities = [];
        vm.schools = [];
        vm.classes = [];

        vm.countrySearch = '';
        vm.citySearch = '';
        vm.schoolSearch = '';
        vm.classSearch = '';

        vm.countryValid = false;
        vm.city = null;
        vm.school = null;
        vm.class = null;

        vm.countryValid = false;
        vm.cityValid = false;
        vm.schoolValid = false;
    };

    vm.handleCountrySearch = function (valid) {
        vm.countries = [];
        vm.citySearch = '';

        if (!valid) return;

        vm.countries = $filter('filter')(countriesNames, vm.countrySearch);

        vm.countryValid = countriesNames.some((c) => c === vm.countrySearch);
    };

    vm.handleCitySearch = function (valid) {
        vm.cities = [];

        if (!valid || !vm.countryValid) return;

        let countryCode = countries.getCode(vm.countrySearch);
        let uri = `http://localhost:3000/api/city/${vm.citySearch}/${countryCode}`;
        $http.get(uri).then((res) => {
            vm.cities = res.data;
            vm.cityValid = vm.cities.some(
                (c) => c === vm.citySearch
            );

            if (vm.cityValid) {
                $http.get(`http://localhost:3000/api/school/${vm.citySearch}`).then((res) => {
                    vm.schools = schools = res.data;
                });
            }
        });

    };

    vm.handleSchoolSearch = function (valid) {
        vm.schools = [];

        if (!valid) return;

        vm.schools = $filter('filter')(schools, vm.schoolSearch);

        vm.schoolValid = schools.some((s) => s.name === vm.schoolSearch);

        if (vm.schoolValid) {
            let school = schools.find((s)=>s.name === vm.schoolSearch);
            $http.get(`http://localhost:3000/api/class?school=${school.id}`).then((res) => {
                vm.classes = classes = res.data;
                console.log(vm.classes);
            });
        }
    };
}

module.exports = {
    templateUrl: '/static/app/class/search/search.template.html',
    controller,
    bindings: {
        userClass: '<'
    }
};