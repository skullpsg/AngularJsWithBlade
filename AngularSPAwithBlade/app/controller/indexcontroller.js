'use strict';
angularBladeApp.controller('indexController', ['$scope', '$location', function ($scope, $location) {
    $(window).resize(function () {
        _pageResize();
    });

    //var LoadMenuItems = function () {
    //    $rootScope.MenuItems.push(new LeftMenuItem('Settings', 'Dashboard', 'fa fa-tachometer', 'Settings/Dashboard', true));
    //    $rootScope.MenuItems.push(new LeftMenuItem('Settings', 'Namespaces', 'icon-sb-icon', 'Settings/Namespaces'));
    //    $rootScope.MenuItems.push(new LeftMenuItem('Settings', 'UserManagement', 'fa fa-users', 'Settings/UserManagement'));
    //    $rootScope.MenuItems.push(new LeftMenuItem('Settings', 'AccountDetails', 'fa fa-newspaper-o', 'Settings/AccountDetails'));
    //}

    var _pageResize = function () {
        if ($(window).width() <= 975) {
            $("#wrapper, #page").width($(window).width());
        }
        else {
            $("#wrapper, #page").width($(window).width());
        }
        $("#wrapper, #page").height($(window).height() - 40);
    }
    _pageResize();
}]);