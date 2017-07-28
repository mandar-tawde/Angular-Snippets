angular.module('main', [])
    .controller('numberController', ['$scope', 'numberStore', function($scope, numberStore) {

        numberStore.getNumber(20)
            .then(function(response) {
                $scope.numDescription = response.data;
                console.log($scope.numDescription);
            });
    }])