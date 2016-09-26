module.exports = ['$http', '$q', function ($http, $q) {
    var user = null;
    var defer = $q.defer;
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
        getUser() {
            return user;
        },
        isLogginIn() {
            return !!user;
        }
    };
}];