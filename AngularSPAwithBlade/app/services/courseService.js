'use strict';
angularBladeApp.factory('courseService', ['$rootScope', '$q', '$http', 'apiServiceBaseUri', function ($rootScope, $q, $http, apiServiceBaseUri) {
    var serviceBaseUrl = apiServiceBaseUri;
    var courseServiceFactory = {};

    var _getCourses = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Courses',
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _addCourse = function (cource) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            data: cource,
            url: serviceBaseUrl + 'api/Courses/Add',
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _getCoursesByUniversityId = function (UnivId) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Courses/Universities/' + UnivId,
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _deleteCoursesById = function (courceId) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Courses/Delete/' + courceId,
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    courseServiceFactory.GetCourses = _getCourses;
    courseServiceFactory.AddCourse = _addCourse;
    courseServiceFactory.GetCoursesByUniversityId = _getCoursesByUniversityId;
    courseServiceFactory.DeleteCoursesById = _deleteCoursesById;
    return courseServiceFactory;
}]);