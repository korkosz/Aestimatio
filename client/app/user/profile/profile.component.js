module.exports = {
    templateUrl: '/static/app/user/profile/profile.template.html',
    controller
};

function controller(auth, userService, classService) {
    this.userClass = classService.UserClass.name;
    this.userMail = auth.getUser().email; 
    this.password = 'abcdefghijk'; 
}