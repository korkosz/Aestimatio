module.exports = angular.module('ct.gradeValidator', [])
    .directive('gradeValidator', function () {
        return {
            require: 'ngModel',
            link(scope, el, attrs, ctrl) {
                ctrl.$validators.grade = function (modelValue, viewValue) {
                    var value = modelValue || viewValue;

                    return value > 0 && value < 7;
                };

                ctrl.$parsers.push((viewValue) => {
                    if (!viewValue) return;

                    var isValid = viewValue > 0 && viewValue < 7;

                    if (!isValid) {
                        ctrl.$setViewValue(undefined);
                        ctrl.$render();
                        return undefined;
                    }

                    return viewValue;
                });
            }
        };
    });
