module.exports = function extension(classService) {
    return {
        require: 'calendar',
        scope: {},
        link(scope, el, attrs, calendarCtrl) {           
            scope.$watch(() => {
                return classService.UserClass.tests.length;
            }, () => {
                calendarCtrl.generateDaysArray();
            });

            //Override parents method
            calendarCtrl.getDataForCurMonth = getExamsForCurMonth;

            function getExamsForCurMonth() {
                var exams = classService.UserClass.tests;

                var monthStart = calendarCtrl.activeMonth
                    .startOf('month').valueOf(); 
                var monthEnd = calendarCtrl.activeMonth
                    .endOf('month').valueOf();

                return exams.filter(ex => {
                    return ex.date <= monthEnd &&
                        ex.date >= monthStart;
                });
            }
        }
    };
}; 