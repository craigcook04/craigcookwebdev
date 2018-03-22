var module = angular.module('demoApp', []);
module.controller('MainCtrl', ['$scope', function($scope){  // "$scope" is arbitrary
    $scope.data = {};
    $scope.disabled = true;
    $scope.submit = function() {
        alert("Form Submitted!!\nEmail: " + $scope.data.email + "\nPassword: " + $scope.data.password);
    };
}]);
