module.exports = [function () {
    var factory = {
        calculateAverage,
        averageLabel
    };

    function calculateAverage(grades) {
        var numerator = 0;
        var denominator = 0;
        var average = 0;

        grades.forEach((grade) => {
            numerator += grade.grade * grade.ratio;
            denominator += grade.ratio;
        });

        average = numerator / denominator;

        if (Number.isNaN(average)) return false;

        average = average.toFixed(2);

        if (average.substr(average.length - 2, 2) === '00') {
            return Number.parseInt(average);
        }

        return average;
    }

    function averageLabel(grades) {
        var result = calculateAverage(grades);

        if (!result) return 'No Grades';
        else return result;
    }

    return factory;
}];