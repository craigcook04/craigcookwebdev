var module = angular.module('demoApp', []);
module.controller('MainCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){  // "$scope" is arbitrary
    $scope.data = {};
    $scope.disabled = true;
    $scope.loading = false;
    $scope.postResult = 0;
    
    $scope.submit = function() {
        $scope.loading = true;
        $http.post('/login', $scope.data).success(function(data) {
            console.log("Form Success!", data);
            if(data.loggedIn) {
                $scope.postResult = 1;
                $location.url('/report');
            } else $scope.postResult = 2;
            $scope.loading = false;
        });
    };
}]);
