module.exports = ['$resource', function ($resource) {
    return $resource('/api/class/:classId', { classId: '@_id' });
}];