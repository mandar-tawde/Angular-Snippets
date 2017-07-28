angular.module('main')
    .service('numberStore', ['$log', '$http', function($log, $http) {

        this.getNumber = function(number) {
            return ($http.get("http://numbersapi.com/" + number));
        }
    }])