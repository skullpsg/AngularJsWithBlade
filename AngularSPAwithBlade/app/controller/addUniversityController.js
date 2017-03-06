'use strict';
angularBladeApp.controller('addUniversityController', ['$scope', '$location', 'bladeService', 'data', 'universityService', function ($scope, $location, bladeService, data, universityService) {
    $scope.enable = false;
    $scope.university = data;
    $scope.countries = [];
    $scope.form = {};

    var GetCountriesList = function () {
        universityService.GetCountriesList().then(function (data) {
            $scope.countries = data;
        })
    }

    $scope.$watch('university.Name', function () {
        if ($scope.form.AddOrEditUniversity !== undefined)
            $scope.enable = $scope.form.AddOrEditUniversity.$valid;
    });
    $scope.$watch('university.Country', function () {
        if ($scope.form.AddOrEditUniversity !== undefined)
            $scope.enable = $scope.form.AddOrEditUniversity.$valid;
    });
    $scope.$watch('university.Rank', function () {
        if ($scope.form.AddOrEditUniversity !== undefined)
            $scope.enable = $scope.form.AddOrEditUniversity.$valid;
    });

    $scope.BladeOperation = function () {
        bladeService.Close();
        universityService.AddUniversity($scope.university).then(function (successData) {
            bladeService.CallBack();
        }, function (errorData) {
            alert(error.data.message);
        });
    };
    GetCountriesList();
}]);