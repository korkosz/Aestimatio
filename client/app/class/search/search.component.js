var countries = require('country-list')();
var countriesNames = countries.getNames();


function controller($filter, $http) {
    var vm = this;
    var schools = [];

    vm.$onInit = function () {
        vm.countries = [];
        vm.cities = [];
        vm.schools = [];
        vm.classes = [];

        vm.country = '';
        vm.city = '';
        vm.school = '';
        vm.classSearch = '';

        vm.class = null;

        vm.countryValid = false;
        vm.cityValid = false;
        vm.schoolValid = false;
    };

    vm.handleCountrySearch = function (valid) {
        vm.countries = [];
        vm.city = '';

        if (!valid) return;

        vm.countries = $filter('filter')(countriesNames, vm.country);

        vm.countryValid = countriesNames.some((c) => c === vm.country);
    };

    vm.pickCountry = function (country) {
        vm.country = country;
        vm.countries = $filter('filter')(countriesNames, vm.country);
        vm.countryValid = true;
    };

    vm.handleCitySearch = function (valid) {
        vm.cities = [];

        vm.schools = [];
        schools = [];
        vm.schoolValid = false;
        vm.school = '';

        if (!valid || !vm.countryValid) return;

        let countryCode = countries.getCode(vm.country);
        let uri = `http://localhost:3000/api/city/${vm.city}/${countryCode}`;
        $http.get(uri).then((res) => {
            vm.cities = res.data;
            vm.cityValid = vm.cities.some(
                (c) => c === vm.city
            );

            if (vm.cityValid) {
                $http.get(`http://localhost:3000/api/school/${vm.city}`).then((res) => {
                    vm.schools = schools = res.data;
                });
            }
        });

    };

    vm.pickCity = function (city) {
        vm.city = city;
        vm.cities = $filter('filter')(vm.cities, vm.city);
        vm.cityValid = true;

        $http.get(`http://localhost:3000/api/school/${vm.city}`).then((res) => {
            vm.schools = schools = res.data;
        });
    };

    vm.handleSchoolSearch = function (valid) {
        vm.schools = [];

        if (!valid) return;

        vm.schools = $filter('filter')(schools, vm.school);

        vm.schoolValid = schools.some((s) => s.name === vm.school);

        if (vm.schoolValid) {
            let school = schools.find((s) => s.name === vm.school);
            $http.get(`http://localhost:3000/api/class?school=${school.id}`).then((res) => {
                vm.classes = res.data;
            });
        }
    };

    vm.pickSchool = function (school) {
        vm.school = school.name;
        vm.schools = $filter('filter')(schools, vm.school);
        vm.schoolValid = true;

        $http.get(`http://localhost:3000/api/class?school=${school.id}`).then((res) => {
            vm.classes = res.data.map((_class) => {
                return {
                    id: _class._id,
                    name: _class.name
                };
            });
        }); 
    };

    vm.pickClass = function (classId) {
        vm.class = classId;
    };

    vm.saveClass = function() {
        if(vm.class) {
            $http.patch(`http://localhost:3000/api/user/changeClass/${vm.authUser.userId}/${vm.class}`);
        }
    }; 
}

module.exports = {
    templateUrl: '/static/app/class/search/search.template.html',
    controller,
    bindings: {
        userClass: '<',
        authUser: '<'
    }
};