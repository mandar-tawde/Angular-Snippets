 angular.module('spa', ['ngRoute'])
     .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
         //$locationProvider.hashPrefix('');

         $routeProvider.when('/', { templateUrl: 'templates/home.html', controller: 'homeCtr' })
             .when('/about', { templateUrl: 'templates/about.html', controller: 'aboutCtr' })
             .when('/contact', { templateUrl: 'templates/contact.html', controller: 'contactCtr' })
     }])
     .controller('homeCtr', ['$scope', function($scope) {
         $scope.discription = "Home Controller says Hello ..!"
     }])
     .controller('aboutCtr', ['$scope', function($scope) {
         $scope.discription = "About Controller says Hello ..!"
     }])
     .controller('contactCtr', ['$scope', function($scope) {
         $scope.discription = "Contact Controller says Hello ..!"
     }])