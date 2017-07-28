angular.module('studentModule', [])
    .filter('getGender', function() {

    })

.controller('studentDataController', ['$scope', 'studentDataStore', '$timeout', '$filter', function($scope, studentDataStore, $timeout, $filter) {

    $scope.spinner1 = true;
    $scope.spinner2 = false;
    $scope.addButton = true;
    $scope.updateButton = false;
    $scope.cancelButton = false;
    $scope.rollNo = "";
    $scope.name = "";
    $scope.age = "";
    $scope.email = "";
    $scope.date = "";
    $scope.gender = "male";
    $scope.msgDivShow = "";
    $scope.msgDivShowColor = "";
    $scope.msgDivEdit = "";
    $scope.msgDivEditColor = "";
    $scope.editID = "";

    loadData = function() {
        studentDataStore.getStudents()
            .then(function(response) {
                $scope.students = response.data;
            }, function(error) {
                $scope.msgDivShow = "Unable to get data";
                $scope.msgDivShowColor = "Red";
            })
            .finally(function() {
                $scope.spinner1 = false;
            })
    }

    $timeout(loadData, 3000);

    $scope.addClicked = function() {
        $scope.msgDivShow = "";
        $scope.msgDivShowColor = "";
        $scope.msgDivEdit = "";
        $scope.msgDivEditColor = "";
        $scope.spinner2 = true;
        $timeout(function() {

            if ($scope.gender == "male")
                var maleFlag = true;
            else
                var maleFlag = false;

            var dateArray = $filter('date')($scope.date, "yyyy-MM-dd").toString().split("-");
            var date = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];

            var student = {
                "rollNo": $scope.rollNo,
                "name": $scope.name,
                "age": $scope.age,
                "email": $scope.email,
                "date": date,
                "isMale": maleFlag
            }

            studentDataStore.saveStudent(student)
                .then(function(response) {
                    $scope.msgDivEdit = "Student entry added succesfully";
                    $scope.msgDivEditColor = "Green";
                    loadData();
                }, function(error) {
                    $scope.msgDivEdit = "Failed to add student entry";
                    $scope.msgDivEditColor = "Red";
                })
                .finally(function() {
                    $scope.spinner2 = false;
                })
        }, 3000);
    }

    $scope.updateClicked = function() {
        $scope.msgDivShow = "";
        $scope.msgDivShowColor = "";
        $scope.msgDivEdit = "";
        $scope.msgDivEditColor = "";
        $scope.spinner2 = true;
        $timeout(function() {

            if ($scope.gender == "male")
                var maleFlag = true;
            else
                var maleFlag = false;

            var dateArray = $filter('date')($scope.date, "yyyy-MM-dd").toString().split("-");
            var date = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];

            var student = {
                "rollNo": $scope.rollNo,
                "name": $scope.name,
                "age": $scope.age,
                "email": $scope.email,
                "date": date,
                "isMale": maleFlag
            }

            studentDataStore.updateStudent($scope.editID, student)
                .then(function(response) {
                    loadData();
                    $scope.cancelClicked();
                    $scope.msgDivEdit = "Student data updated succesfully";
                    $scope.msgDivEditColor = "Green";
                }, function(error) {
                    $scope.msgDivEdit = "Failed to update student data";
                    $scope.msgDivEditColor = "Red";
                })
                .finally(function() {
                    $scope.spinner2 = false;
                })

        }, 3000);
    };

    $scope.cancelClicked = function() {
        $scope.msgDivShow = "";
        $scope.msgDivShowColor = "";
        $scope.msgDivEdit = "";
        $scope.msgDivEditColor = "";
        $scope.addButton = true;
        $scope.updateButton = false;
        $scope.cancelButton = false;
        $scope.rollNo = "";
        $scope.name = "";
        $scope.age = "";
        $scope.email = "";
        $scope.date = "";
        $scope.gender = "male";
    };

    $scope.deletePressed = function(event) {
        $scope.msgDivShow = "";
        $scope.msgDivShowColor = "";
        $scope.msgDivEdit = "";
        $scope.msgDivEditColor = "";
        var rollNo = event.target.id;
        var confirmation = confirm("Are you sure you want to delete this student entry ?");

        if (confirmation) {
            studentDataStore.deleteStudent(rollNo)
                .then(function(response) {
                    $scope.msgDivShow = "Student entry deleted succesfully";
                    $scope.msgDivShowColor = "Green";
                    loadData();
                }, function(error) {
                    $scope.msgDivShow = "Unable to delete student entry";
                    $scope.msgDivShowColor = "Red";
                })
                .finally(function() {
                    $scope.spinner2 = false;
                })
        }
    }

    $scope.editPressed = function(event) {
        $scope.msgDivShow = "";
        $scope.msgDivShowColor = "";
        $scope.msgDivEdit = "";
        $scope.msgDivEditColor = "";

        var rollNo = event.target.id;
        studentDataStore.getStudent(rollNo)
            .then(function(response) {
                student = response.data;
                $scope.rollNo = student.rollNo;
                $scope.name = student.name;
                $scope.age = student.age;
                $scope.email = student.email;

                var dateArray = student.date.split("/");
                var date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
                $scope.date = new Date(date);

                if (student.isMale) {
                    $scope.gender = "male";

                } else {
                    $scope.gender = "female";

                }

                $scope.addButton = false;
                $scope.updateButton = true;
                $scope.cancelButton = true;
            }, function(error) {
                $scope.msgDivShow = "Unable to load data";
                $scope.msgDivShowColor = "Red";
            })

        $scope.editID = rollNo;
    }


}])