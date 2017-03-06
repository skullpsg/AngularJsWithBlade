'use strict';
angularBladeApp.factory('universityService', ['$rootScope', '$q', '$http', 'apiServiceBaseUri', function ($rootScope, $q, $http, apiServiceBaseUri) {
    var serviceBaseUrl = apiServiceBaseUri;
    var universityServiceFactory = {};
    var _getUniversities = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Universities',
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _getUniversityDetailsByCourseId = function (_courseId) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/University/Details/Courses/' + _courseId,
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _getCountries = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Countries',
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _addUniversity = function (university) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            data: university,
            url: serviceBaseUrl + 'api/Universities/Add',
        }).
    success(function (data, status, headers, config) {
        return deferred.resolve(data);
    }).
     error(function (data, status, headers, config) {
         deferred.reject(data);
     });
        return deferred.promise;
    };

    var _deleteUniversityById = function (universityId) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Universities/Delete/' + universityId,
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    universityServiceFactory.GetUniversities = _getUniversities;
    universityServiceFactory.GetCountriesList = _getCountries;
    universityServiceFactory.AddUniversity = _addUniversity;
    universityServiceFactory.GetUniversityDetailsByCourseId = _getUniversityDetailsByCourseId;
    universityServiceFactory.DeleteUniversityById = _deleteUniversityById

    return universityServiceFactory;
}]);