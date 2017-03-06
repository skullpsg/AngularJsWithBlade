'use strict';
angularBladeApp.controller('addCourseAndUniversityController', ['$scope', '$location', 'bladeService', 'data', 'Course', 'University', 'universityService', 'courseService', function ($scope, $location, bladeService, data, Course, University, universityService, courseService) {
    $scope.enable = false;
    $scope.course = new Course();
    $scope.university = new University();
    $scope.nextEnable = false;
    $scope.isCourseAlone = false;
    $scope.form = {};
    $scope.universityList = [];

    var GetCountriesList = function () {
        universityService.GetCountriesList().then(function (data) {
            $scope.countries = data;
        })
    }

    $scope.$watch('university.Name', function () {
        if ($scope.form.AddOrEditUniversity !== undefined)
            $scope.nextEnable = $scope.form.AddOrEditUniversity.$valid;
    });
    $scope.$watch('university.Country', function () {
        if ($scope.form.AddOrEditUniversity !== undefined)
            $scope.nextEnable = $scope.form.AddOrEditUniversity.$valid;
    });

    var getUniversitysList = function () {
        $scope.universityList.length = 0;
        universityService.GetUniversities().then(function (data) {
            $.each(data, function (index, value) {
                $scope.universityList.push(value);
            });
        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.$watch('course.Name', function () {
        if ($scope.form.AddOrEditCourse !== undefined)
            $scope.enable = $scope.form.AddOrEditCourse.$valid;
    });

    $scope.$watch('course.Credit', function () {
        if ($scope.form.AddOrEditCourse !== undefined && $scope.form.AddOrEditCourse.Name.$touched)
            $scope.enable = $scope.form.AddOrEditCourse.$valid;
    });

    $scope.BladeOperation = function () {
        bladeService.Close();
        universityService.AddUniversity($scope.university).then(function (successData) {
            $scope.course.UniversityId = successData.Id;
            courseService.AddCourse($scope.course).then(function (successData) {
                bladeService.CallBack();
            }, function (errorData) {
                alert(error.data.message);
            });
        }, function (errorData) {
            alert(error.data.message);
        });
    };
    GetCountriesList();
    getUniversitysList();
}]);