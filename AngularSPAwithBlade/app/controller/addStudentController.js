'use strict';
angularBladeApp.controller('addStudentController', ['$scope', '$location', 'bladeService', 'data', 'universityService', 'courseService', 'studentService', function ($scope, $location, bladeService, data, universityService, courseService, studentService) {
    $scope.enable = false;
    $scope.student = data;
    $scope.selectedUniv = null;
    $scope.nextEnable = true;
    $scope.form = {};
    $scope.PersonSex = [{ Key: 'Male', value: 0 }, { Key: 'Female', value: 1 }]
    $scope.universityList = [];

    $scope.$watch('student.Name', function () {
        if ($scope.form.AddOrEditStudent !== undefined)
            $scope.enable = $scope.form.AddOrEditStudent.$valid;
    });

    $scope.$watch('student.Address', function () {
        if ($scope.form.AddOrEditStudent !== undefined)
            $scope.enable = $scope.form.AddOrEditStudent.$valid;
    });

    var getUniversitysList = function () {
        $scope.universityList = [];
        if (data.CourceId != "" && data.CourceId != null && data.CourceId != undefined) {
            courseService.GetUniversityDetailsByCourseId(data.CourceId).then(function (data) {
                $scope.selectedUniv = data;
            }, function (error) {
                alert(error.data.message);
            });
        }

        universityService.GetUniversities().then(function (data) {
            $.each(data, function (index, value) {
                $scope.universityList.push(value);
            });
        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.UniversityChanged = function (selectedUniversity) {
        courseService.GetCoursesByUniversityId(selectedUniversity.Id).then(function (data) {
            $scope.courseList = data;
        });
    }

    $scope.BladeOperation = function () {
        studentService.AddStudent($scope.student).then(function (data) {
        }, function (error) {
            alert(error.data.message);
        });
    };

    getUniversitysList();
}]);