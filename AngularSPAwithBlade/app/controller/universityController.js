'use strict';
angularBladeApp.controller('universityController', ['$scope', '$location', 'BladeModel', 'universityService', 'bladeService', 'University', function ($scope, $location, BladeModel, universityService, bladeService, University) {
    $scope.universityList = new kendo.data.ObservableArray([]);
    var getUniversitysList = function () {
        $scope.universityList.length = 0;
        universityService.GetUniversities().then(function (data) {
            $.each(data, function (index, value) {
                $scope.universityList.push(value);
            });
        }, function (error) {
            //alert(error.data.message);
        });
    };
    $scope.addUniversity = function () {
        var bladeModel = new BladeModel();
        bladeModel.InstanceId = 'Add University';
        bladeModel.Title = 'Add University';
        bladeModel.ActionText = 'ADD';
        bladeModel.Templates = ['app/views/addUniversityTemplate.html'];
        bladeModel.Controller = 'addUniversityController';
        bladeModel.Width = 600;
        bladeModel.Data = new University();
        bladeModel.Callback = getUniversitysList;
        bladeModel.ExcludedFooterElements = [{ Element: [] }];
        bladeService.showBlade(bladeModel);
    }

    $scope.UniversityGrid = {
        dataSource: new kendo.data.DataSource({
            data: $scope.universityList,
        }),
        sortable: {
            mode: "single",
            allowUnsort: false
        },
        noRecords: {
            template: "No data Found."
        },
        resizable: true,
        autoSync: true,
        columns: [
            { field: "", title: "Id" },
            { field: "Name", title: "Name", sortable: true },
            { field: "Rank", title: "Rank", sortable: true },
            { field: "", title: "Country" },
             { field: "", title: "" },
        ],

        rowTemplate: kendo.template($("#UniversityListDetailsTemplate").html()),
    };
    $scope.EditUniversity = function (_university) { }
    $scope.DeleteUniversity = function (_university) {
        universityService.DeleteUniversityById(_university.Id).then(function (data) {
        }, function (error) {
            alert(error.data.message);
        });
    }

    getUniversitysList();
}]);