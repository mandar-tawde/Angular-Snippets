 angular.module('departmentsModule', ['ngRoute'])
     .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
         //$locationProvider.hashPrefix('');

         $routeProvider.when('/', { templateUrl: 'templates/displayData.html', controller: 'displayDataCtr' })
             .when('/edit/:ID', { templateUrl: 'templates/editData.html', controller: 'editDataCtr' })
             .when('/addData', { templateUrl: 'templates/addData.html', controller: 'addDataCtr' })
     }])

 .controller('displayDataCtr', ['$scope', function($scope) {

     $scope.loadDepartments = function() {
         $scope.departments = JSON.parse(localStorage.getItem("departments"));

         if ($scope.departments == null)
             $scope.departments = [];

         $scope.departmentIndexes = [];
         for (var i = 0; i < $scope.departments.length; i++) {
             $scope.departmentIndexes.push(i);
         }
     }

     $scope.loadDepartments();

     $scope.deletePressed = function(event) {
         var confirmation = confirm("Are you sure you want to delete this department ?");

         if (confirmation) {
             var index = event.target.id;
             $scope.departments.splice(index, 1);
             localStorage.setItem("departments", JSON.stringify($scope.departments));
             $scope.message = "Department deleted successfully";
             $scope.loadDepartments();
         }
     }
 }])

 .controller('editDataCtr', ['$scope', '$routeParams', function($scope, $routeParams) {
     var index = $routeParams.ID;
     departments = JSON.parse(localStorage.getItem("departments"));
     $scope.department = departments[index];

     $scope.updateClicked = function() {
         departments[index] = $scope.department;
         localStorage.setItem("departments", JSON.stringify(departments));
         $scope.message = "Department updated successfully";
     }
 }])

 .controller('addDataCtr', ['$scope', function($scope) {
     $scope.addClicked = function() {
         department = {
             id: $scope.id,
             name: $scope.name,
             location: $scope.location
         }

         departments = JSON.parse(localStorage.getItem("departments"));
         if (departments == null)
             departments = [];

         departments.push(department);

         localStorage.setItem("departments", JSON.stringify(departments));

         $scope.message = "Department added succesfully";
     }
 }])

 .controller('deleteDataCtr', ['$scope', '$routeParams', function($scope, $routeParams) {

 }])