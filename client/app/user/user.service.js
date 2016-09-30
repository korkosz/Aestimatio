var jsonpatch = require('fast-json-patch');

module.exports = ['$resource', 'classService', 'auth', function ($resource, classService, auth) {
    /**
    * Resource
    */
    var UserRes = $resource('/api/user/:id', { id: '@_id' },
        {
            'update': {
                method: 'PATCH',
                transformRequest: function (body) {
                    console.log(body);
                }
            }
        });

    /**
     * Instance for the logged user
     */
    var User = UserRes.get({ id: auth.getUser().userId });

    /**
     * Refresh resource from db
     */
    var refreshUser = function () {
        User = UserRes.get({ id: auth.getUser().userId });
    };

    /**
     * Get formatted user's grades. We get output like:
     * [{
     *    subject: 'Math',
     *    grades: [
     *      {grade: 5, ratio: 3, type: 'Exam'},
     *      {grade: 3, ratio: 1, type: 'Exam'},
     *    ]
     * }]
     */
    var getLoggedUserGrades = function () {
        var subjects = classService.UserClass.subjects;
        var unformattedGrades = User.grades;
        var formattedGrades = [];

        for (let i = 0, len = subjects.length; i < len; i++) {
            let subject = subjects[i];
            let grades = [];

            unformattedGrades.forEach(ufGrade => {
                if (ufGrade.subject === subject) {
                    grades.push({
                        grade: ufGrade.value,
                        ratio: classService.getGradeRatio(ufGrade.gradeType),
                        type: ufGrade.gradeType
                    });
                }
            });

            formattedGrades.push({
                subject,
                grades
            });
        }

        return formattedGrades;
    };

    return {
        User,
        UserRes,
        refreshUser,
        getLoggedUserGrades
    };
}];