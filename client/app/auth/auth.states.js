module.exports = function ($stateProvider) {
    $stateProvider.state({
        name: 'login',
        url: '/login',
        component: 'login'
    });

    $stateProvider.state({
        name: 'register',
        url: '/register',
        component: 'register'
    });
};