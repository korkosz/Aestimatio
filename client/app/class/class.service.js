var jsonpatch = require('fast-json-patch');

module.exports = ['$resource', 'auth', function ($resource, auth) {
    /**
     * Resource
     */
    var ClassRes = $resource('/api/class/:classId', { classId: '@_id' }, {
        update: {
            method: 'PATCH',
            transformRequest: function (updatedClass) {

                /**
                 * We have to remove $promise object because of 
                 * stack overlow during jsonpatch.compare
                 */
                var UserClassCopy = angular.copy(UserClass);
                delete UserClassCopy.$promise;
                delete updatedClass.$promise;

                var comp = jsonpatch.compare(UserClassCopy, updatedClass);
                return angular.toJson(comp);
            }
        }
    });


    /**
     * Instance of the logged user's class
     */
    var UserClass = ClassRes.get({ classId: auth.getUser().class });

    /**
     * Returns ratio for specific grade type
     */
    var getGradeRatio = function (_gradeType) {
        var gradeType = UserClass.gradeTypes.find(type => {
            return type.name === _gradeType;
        });

        return gradeType && gradeType.rate;
    };

    return {
        UserClass,
        getGradeRatio
    };
}];