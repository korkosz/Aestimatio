class ctrl {
    constructor(auth, userService) {
        this.user = auth.getUser();
        this.formattedGrades =
            userService.usersGrades(this.user.grades);
    }
}

module.exports = {
    controller: ctrl,
    templateUrl: '/static/app/user/grades/grades.template.html'
};