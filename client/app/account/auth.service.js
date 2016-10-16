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
                defer.reject();
            });

            return promise;
        },
        logIn(username, password, remember) {
            return $http.post('/auth/login', {
                username: username,
                password: password,
                remember: remember
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