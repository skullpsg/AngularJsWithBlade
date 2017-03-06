'use strict';
angularBladeApp.factory('studentService', ['$rootScope', '$q', '$http', 'apiServiceBaseUri', function ($rootScope, $q, $http, apiServiceBaseUri) {
    var serviceBaseUrl = apiServiceBaseUri;
    var studentServiceFactory = {};

    var _getStudents = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Students',
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _addStudent = function (student) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            data: student,
            url: serviceBaseUrl + 'api/Students/Add',
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _deleteStudentById = function (studentId) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Students/Delete/' + studentId,
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    studentServiceFactory.GetStudents = _getStudents;
    studentServiceFactory.AddStudent = _addStudent;
    studentServiceFactory.DeleteStudentById = _deleteStudentById

    return studentServiceFactory;
}]);