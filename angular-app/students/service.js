angular.module('studentModule')
    .service('studentDataStore', ['$log', '$http', function($log, $http) {

        url = "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/";

        this.saveStudent = function(student) {
            return $http.post(url, student);
        }

        this.getStudents = function() {
            return $http.get(url);
        }

        this.getStudent = function(id) {
            return $http.get(url + id);
        }

        this.deleteStudent = function(id) {
            return $http.delete(url + id);
        }

        this.updateStudent = function(id, student) {
            return $http.put(url + id, student);
        }
    }])