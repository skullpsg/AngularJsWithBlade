'use strict';
angularBladeApp.controller('studentsController', ['$scope', '$location', 'bladeService', 'BladeModel', 'studentService', 'Student', function ($scope, $location, bladeService, BladeModel, studentService, Student) {
    $scope.studentList = new kendo.data.ObservableArray([]);
    var getStudentsList = function () {
        studentService.GetStudents().then(function (data) {
            $.each(data, function (index, value) {
                $scope.studentList.push(value);
            });
        }, function (error) {
            //alert(error.data.message);
        });
    };
    $scope.addStudent = function () {
        var bladeModel = new BladeModel();
        bladeModel.InstanceId = 'Add Student';
        bladeModel.Title = 'Add Student';
        bladeModel.ActionText = 'ADD';
        bladeModel.Data = new Student();
        bladeModel.Templates = ['app/views/selectUnivForAddingStudent.html', 'app/views/addstudent.html'];
        bladeModel.Controller = 'addStudentController';
        bladeModel.Width = 600;
        bladeModel.Callback = getStudentsList;
        bladeModel.ExcludedFooterElements = [{ Element: ["ADD"] }, { Element: [] }];
        bladeService.showBlade(bladeModel);
    }

    $scope.GridArrayOptionsample = {
        dataSource: new kendo.data.DataSource({
            data: $scope.studentList,
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
            { field: "", title: "Sex" },
            { field: "", title: "CourseId" },
             { field: "", title: "" },
        ],

        rowTemplate: kendo.template($("#StudentListDetailsTemplate").html()),
    };
    $scope.EditStudent = function (_student) { }
    $scope.DeleteStudent = function (_student) {
        studentService.DeleteStudentById(_student.Id).then(function (data) {
        }, function (error) {
            alert(error.data.message);
        });
    }
    getStudentsList();
}]);