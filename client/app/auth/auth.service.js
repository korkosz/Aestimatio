module.exports = ['$http', '$q', function ($http, $q) {
    var user = null;
    return {
        setUser() {
            var defer = $q.defer();
            var promise = defer.promise;

            $http.get('/auth/user').then((res) => {
                user = res.data;
                if (user) {
                    defer.resolve();
                } else {
                    defer.reject();
                }

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
                return this.setUser();
                //return promise;
            });
        },
        getUser() {
            return user;
        },
        isLoggedIn() {
            return !!user;
        },
        // waitForUser() {
        //     return promise;
        // },
        logout() {
            return $http.get('/auth/logout').then(() => {
                user = null;
            });
        }
    };
}];