module.exports = ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    var user = null;
    var defer = $q.defer();
    var promise = defer.promise;
    return {
        setUser() {
            $http.get('/auth/user').then((res) => {
                user = res.data;
                defer.resolve();
            }, () => {
                user = null;
            });

            return promise;
        },
        logIn(username, password) {
            return $http.post('/auth/login', {
                username: username,
                password: password
            }).then(() => {
                this.setUser(); 
            });
        },
        getUser() {
            return user;
        },
        isLoggedIn() {
            return !!user;
        },
        waitForUser() {
            return promise;
        },
        logout() {
            return $http.get('/auth/logout').then(() => {
                $timeout(() => {
                    user = null;
                }, 0);
            });
        }
    };
}];