module.exports = ['$resource', 'classService', function ($resource, classService) {
    /**
     * Resource
     */
    var User = $resource('/api/user/:id', { id: '@_id' });

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
    var usersGrades = function (unformattedGrades) {
        var formattedGrades = [];

        classService.UserClass.$promise.then((uClass) => {
            var subjects = uClass.subjects;

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
        });
        return formattedGrades;
    };

    return {
        User,
        usersGrades
    };
}];