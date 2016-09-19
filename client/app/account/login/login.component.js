class ctrl {
    constructor() {
        alert('login component loaded');
    }
}

var component = {
    templateUrl: './login.template.html',
    controller: ctrl
};

module.exports = component;