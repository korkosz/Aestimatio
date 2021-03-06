var jsonpatch = require('fast-json-patch');

module.exports = ['$resource', 'classService', 'auth', '$rootScope',
    function ($resource, classService, auth) {
        var UserRes,
            User,
            getLoggedUserGrades;            
            
        /**
         * Resource
         */
        UserRes = $resource('/api/user/:id', { id: '@_id' },
            {
                'update': {
                    method: 'PATCH',
                    transformRequest: function (updatedUser) {

                        /**
                         * We have to remove $promise object because of 
                         * stack overlow during jsonpatch.compare
                         */
                        var UserCopy = angular.copy(User);
                        delete UserCopy.$promise;
                        delete updatedUser.$promise;

                        var comp = jsonpatch.compare(UserCopy, updatedUser);
                        return angular.toJson(comp);
                    }
                }
            });

        /**
         * Instance for the logged user
         */
        User = UserRes.get({ id: auth.getUser().userId });

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
        getLoggedUserGrades = function () {
            const subjects = classService.UserClass.subjects;
            const unformattedGrades = User.grades;
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

        UserRes.prototype.reload = function () {
            var user = this;
            return user.$get({ id: auth.getUser().userId }, function (new_user) {
                user = new_user;
            });
        };

        return {
            User,
            UserRes,
            getLoggedUserGrades
        };
    }];