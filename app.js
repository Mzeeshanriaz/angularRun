angular.module("App",["ngStorage"]).controller("mainController",function($scope,$http, $localStorage){
    var data = "Zeeshan";
    $scope.data = data;
    $scope.clients = [];
    $scope.databtn =true;
    if(!$localStorage.key) $scope.databtn = true;
    $scope.login = function () {
        if(!$localStorage.key)
        $http.post("http://localhost:8000/api/v1/auth",
            {email : '-----------------',password: '*****************'} ).then(function (res) {
            $localStorage.key = res.data.token;
        });
        $scope.databtn=true;
    };
    $scope.getClients = function () {
        var Url = "http://localhost:8000/api/v1/clients?limit=25&page=1&searchFilters%5BsearchText%5D=&searchFilters%5Bstatus%5D%5Binactive%5D%5Bstate%5D=false&searchFilters%5Bstatus%5D%5Bactive%5D%5Bstate%5D=true&searchFilters%5Bfrequency%5D%5B0%5D%5Babbrev%5D=weekly&searchFilters%5Bfrequency%5D%5B0%5D%5Bvalue%5D=1&searchFilters%5Bfrequency%5D%5B0%5D%5Bstate%5D=true&searchFilters%5Bfrequency%5D%5B0%5D%5B%24%24hashKey%5D=object%3A104&searchFilters%5Bfrequency%5D%5B1%5D%5Babbrev%5D=bi-weekly&searchFilters%5Bfrequency%5D%5B1%5D%5Bvalue%5D=2&searchFilters%5Bfrequency%5D%5B1%5D%5Bstate%5D=true&searchFilters%5Bfrequency%5D%5B1%5D%5B%24%24hashKey%5D=object%3A105&searchFilters%5Bfrequency%5D%5B2%5D%5Babbrev%5D=monthly&searchFilters%5Bfrequency%5D%5B2%5D%5Bvalue%5D=4&searchFilters%5Bfrequency%5D%5B2%5D%5Bstate%5D=true&searchFilters%5Bfrequency%5D%5B2%5D%5B%24%24hashKey%5D=object%3A106&searchFilters%5Bfrequency%5D%5B3%5D%5Babbrev%5D=one+time&searchFilters%5Bfrequency%5D%5B3%5D%5Bvalue%5D=0&searchFilters%5Bfrequency%5D%5B3%5D%5Bstate%5D=true&searchFilters%5Bfrequency%5D%5B3%5D%5B%24%24hashKey%5D=object%3A107";
        if($localStorage.key) {
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'Authorization': 'Bearer ' + $localStorage.key
                }
            };
            $http.get(Url, config).then(function (res) {
                $scope.clients = res.data.data.data;
            });
        }
    }
    $scope.logout = function () {
        delete $localStorage.key;
        window.location.reload();
    };
});
