'use strict';
angularBladeApp.controller('courseController', ['$scope', '$location', 'courseService', 'BladeModel', 'bladeService', 'Course', function ($scope, $location, courseService, BladeModel, bladeService, Course) {
    $scope.courseList = new kendo.data.ObservableArray([]);
    var getCoursesList = function () {
        courseService.GetCourses().then(function (data) {
            $.each(data, function (index, value) {
                $scope.courseList.push(value);
            });
        }, function (error) {
            //alert(error.data.message);
        });
    };
    $scope.addCourse = function () {
        var bladeModel = new BladeModel();
        bladeModel.InstanceId = 'Add Course';
        bladeModel.Title = 'Add Course';
        bladeModel.ActionText = 'ADD';
        bladeModel.Templates = ['app/views/addCourceTemplate.html'];
        bladeModel.Controller = 'addCourseController';
        bladeModel.Data = new Course();
        bladeModel.Width = 600;
        bladeModel.Callback = getCoursesList;
        bladeModel.ExcludedFooterElements = [{ Element: [] }];
        bladeService.showBlade(bladeModel);
    }

    $scope.addCourseAndUniv = function () {
        var bladeModel = new BladeModel();
        bladeModel.InstanceId = 'Add Course';
        bladeModel.Title = 'Add University and Course';
        bladeModel.ActionText = 'Save';
        bladeModel.Templates = ['app/views/addUniversityTemplate.html', 'app/views/addCourceTemplate.html'];
        bladeModel.Controller = 'addCourseAndUniversityController';
        bladeModel.Data = new Course();
        bladeModel.Width = 600;
        bladeModel.Callback = getCoursesList;
        bladeModel.ExcludedFooterElements = [{ Element: ["Save"] }, { Element: [] }];
        bladeService.showBlade(bladeModel);
    }

    $scope.CourseGrid = {
        dataSource: new kendo.data.DataSource({
            data: $scope.courseList,
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
            { field: "Credit", title: "Credit", sortable: true },
            { field: "", title: "" },
        ],

        rowTemplate: kendo.template($("#CourseListDetailsTemplate").html()),
    };
    $scope.EditCourse = function (_course) { }
    $scope.DeleteCourse = function (_course) {
        courseService.DeleteCoursesById(_course.Id).then(function (data) {
        }, function (error) {
            alert(error.data.message);
        });
    }

    getCoursesList();
}]);