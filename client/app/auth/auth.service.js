module.exports = ['$http', '$q', function ($http, $q) {
    var user = null;
    return {
        setUser() {
            var defer = $q.defer();
            var promise = defer.promise;

            $http.get('/auth/user/').then((res) => {
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
        logIn(email, password, remember) {
            return $http.post('/auth/login', {
                email: email,
                password: password,
                remember: remember
            }).then(() => {
                return this.setUser();
            });
        },
        getUser() {
            return user;
        }, 
        isLoggedIn() {
            return !!user;
        },
        hasClassAssigned() {
            if(user && user.class) return true;
            else return false;
        },
        logout() {
            return $http.get('/auth/logout').then(() => {
                user = null;
            });
        }
    };
}];