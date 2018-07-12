angular.module("App",["ngStorage"]).controller("mainController",function($scope,$http, $localStorage){
    var data = "Zeeshan";
    $scope.data = data;
    $scope.clients = [];
    this.databtn =true;
    $scope.login = function () {
        if(!$localStorage.key)
        $http.post("http://localhost:8000/api/v1/auth",
            {email : 'Arch.Streich@Roberts.com',password: 'secret'} ).then(function (res) {
            $localStorage.key = res.data.token;
        });
        this.databtn=true;
    };
    $scope.getClients = function () {
        if($localStorage.key) {
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'Authorization': 'Bearer ' + $localStorage.key
                }
            };
            $http.get("http://localhost:8000/api/v1/clients?limit=25&page=1", config).then(function (res) {
                $scope.clients = res.data;
            });
        }
    }
    $scope.logout = function () {
        delete $localStorage.key;
        window.location.reload();
    };
});
