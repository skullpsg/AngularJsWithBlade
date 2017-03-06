var angularBladeApp = angular.module("angularBlade", ['ngRoute', 'ngMaterial', 'BladeJs', 'angular-loading-bar', 'kendo.directives', 'ngMessages']);

angularBladeApp.config(['$routeProvider', '$locationProvider', '$httpProvider', 'cfpLoadingBarProvider', function ($routeProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider) {
    RegisterRoutes($routeProvider, $locationProvider);

    $locationProvider.html5Mode(true).hashPrefix('#');

    cfpLoadingBarProvider.includeBar = true;
}]);

angularBladeApp.directive('customeinputnum', ["$compile", function ($compile) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            value: "="
        },
        link: function ($scope, elem, attrs) {
            var btnhtml = '<div class="custome-number-nav"><div class="custome-number-button custome-number-up" ng-click="btnUp()">+</div><div class="custome-number-button custome-number-down" ng-click="btnDown()">-</div></div>';
            var temp = $compile(btnhtml)($scope);
            elem.after(temp);

            $scope.btnUp = function () {
                var max = attrs.max;
                var oldValue = parseFloat(elem.val());
                if (oldValue >= max) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 1;
                }
                elem.val(newVal);
                elem.trigger("change");
            }
            $scope.btnDown = function () {
                var min = attrs.min;
                var oldValue = parseFloat(elem.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                elem.val(newVal);
                elem.trigger("change");
            }
        }
    };
}]);

var RegisterRoutes = function ($routeProvider, $locationProvider) {
    $routeProvider.when("/university", {
        controller: "universityController",
        templateUrl: "app/views/universityList.html",
    });
    $routeProvider.when("/course", {
        controller: "courseController",
        templateUrl: "app/views/courseList.html",
    });
    $routeProvider.when("/students", {
        controller: "studentsController",
        templateUrl: "app/views/studentsList.html",
    });
    $routeProvider.otherwise({ redirectTo: "/university" });
}

angularBladeApp.constant('apiServiceBaseUri', 'http://localhost/AngularJsWithBladeAPI/');

angularBladeApp.run(['$rootScope', '$location', 'bladeService', function ($rootScope, $location, bladeService) {
    $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
        if (curr != undefined && curr.$$route && curr.$$route.resolve) {
            // Show a loading message until promises are not resolved
        }
    });

    $rootScope.$on('$routeChangeSuccess', function (eventObj, curr, prev) {
        bladeService.Close();
    });
}]);