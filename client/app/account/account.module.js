module.exports = angular
    .module('aestimatio.account', [])
    .component('login', require('./login/login.component.js'))
    .component('register', require('./register/register.component.js'))
    .factory('auth', require('./auth.service.js'));