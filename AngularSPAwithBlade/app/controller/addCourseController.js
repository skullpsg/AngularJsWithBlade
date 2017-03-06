'use strict';
angularBladeApp.controller('addCourseController', ['$scope', '$location', 'bladeService', 'data', 'universityService', 'courseService', function ($scope, $location, bladeService, data, universityService, courseService) {
    $scope.course = data;
    $scope.form = {};
    $scope.isCourseAlone = true;

    $scope.universityList = [];
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
        courseService.AddCourse($scope.course).then(function (successData) {
            bladeService.CallBack();
        }, function (errorData) {
            alert(error.data.message);
        });
    };
    getUniversitysList();
    $scope.enable = false;
}]);