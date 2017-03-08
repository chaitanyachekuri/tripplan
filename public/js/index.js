var planApp = angular.module('roadApp', []);

planApp.controller('roadCtrl', ['$scope', '$http', function (scope, http) {

    scope.Route = {
        origin: "",
        destination: ""
    };

scope.submit = function () {

    http.post('/api/directions', {Route : scope.Route})
        .success(function (err, result) {
           if(err){
               console.log("error while posting /api/directions" + err)
           }
           else{
               console.log(result)
           }


        });

}






}]);