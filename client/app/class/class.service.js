var jsonpatch = require('fast-json-patch');

module.exports = ['$resource', 'auth', function ($resource, auth) {
    var factory = {
        UserClass: null,

        getGradeRatio,
        loadClass
    };

    var ClassRes = null;

    init();

    return factory;

    /// private ///
    function init() {
        ClassRes = $resource('/api/class/:classId', { classId: '@_id' }, {
            update: {
                method: 'PATCH',
                transformRequest: function (updatedClass) {

                    /**
                     * We have to remove $promise object because of 
                     * stack overlow during jsonpatch.compare
                     */
                    var UserClassCopy = angular.copy(factory.UserClass);
                    delete UserClassCopy.$promise;
                    delete updatedClass.$promise;

                    var comp = jsonpatch.compare(UserClassCopy, updatedClass);
                    return angular.toJson(comp);
                }
            }
        });

        if (auth.getUser().class) {
            factory.UserClass = ClassRes.get({
                classId: auth.getUser().class
            });
        }
    }

    /// API ///

    /**
     * Returns ratio for specific grade type
     */
    function getGradeRatio(_gradeType) {
        var gradeType = factory.UserClass.gradeTypes.find(type => {
            return type.name === _gradeType;
        });

        return gradeType && gradeType.rate;
    }

    /**
     * Reload class from db
     */
    function loadClass(classId) {
        return ClassRes.get({ classId }, (data) => {
            factory.UserClass = data;
        }).$promise;
    }
}];