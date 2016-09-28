class ctrl {
    constructor(auth, userService) {
        this.user = auth.getUser();
        //moze zamienic na resolve - wyrzucimy $promise
        //z serwisu - bedziemy go przekazywac w parametrze
        //nawet nie caly klass tylko subjects
        this.formattedGrades =
            userService.usersGrades(this.user.grades);
    }
}

module.exports = {
    controller: ctrl,
    templateUrl: '/static/app/user/grades/grades.template.html'
};