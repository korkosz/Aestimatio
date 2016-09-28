module.exports = ['$resource', 'auth', function ($resource, auth) {
    /**
     * Resource
     */
    var ClassRes = $resource('/api/class/:classId', { classId: '@_id' });

    /**
     * Instance for the logged user
     */
    var UserClass = ClassRes.get({ classId: auth.getUser().class });

    /**
     * Refresh resource from db
     */
    var refreshUserClass = function () {
        UserClass = ClassRes.get({ classId: auth.getUser().class });
    };

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
        refreshUserClass,
        getGradeRatio
    };
}];