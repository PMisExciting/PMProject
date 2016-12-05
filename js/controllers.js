/**
 * Created by Sunny on 16/11/29.
 */
angular.module('myApp.controllers', [])
    // 主页信息内容
    .controller('homeCtrl', function($rootScope){
        $rootScope.hostUrl = 'localhost';
    })

    .controller('adoptCtrl', function($rootScope, $scope, $http){
        //
        //$scope.records = [
        //    {
        //        "Name" : "Alfreds Futterkiste",
        //        "Country" : "Germany"
        //    },{
        //        "Name" : "Berglunds snabbköp",
        //        "Country" : "Sweden"
        //    },{
        //        "Name" : "Centro comercial Moctezuma",
        //        "Country" : "Mexico"
        //    },{
        //        "Name" : "Ernst Handel",
        //        "Country" : "Austria"
        //    }, {
        //        "Name" : "Alfreds Futterkiste",
        //        "Country" : "Germany"
        //    },{
        //        "Name" : "Berglunds snabbköp",
        //        "Country" : "Sweden"
        //    },{
        //        "Name" : "Centro comercial Moctezuma",
        //        "Country" : "Mexico"
        //    },{
        //        "Name" : "Ernst Handel",
        //        "Country" : "Austria"
        //    }
        //]
        $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetAdoptAnimal")
            .success(function (ret) {
                if (ret != null && ret[0] != null) {
                    //$rootScope.user = ret[0];
                    //window.location.href = "#home";
                    //console.log(ret);
                    $scope.adoptList = ret;
                } else {
                    console.log("no animal");
                }
            })
            .error(function () {
                alert('登录失败，因网络原因无法登陆');
            });
    })

    .controller('lostCtrl', function(){

    })

    .controller('forumCtrl', function(){

    })

    .controller('loginCtrl', function($rootScope, $scope, $http){

        var error = document.getElementById("login-error");

        $scope.userLogin = function(){

            error.innerHTML = "";
            $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/UserLogin", {
                    params: {
                        username: $scope.username,
                        password: $scope.password
                    }
                })
                .success(function (ret) {
                    if (ret != null && ret[0] != null) {
                        $rootScope.user = ret[0];
                        window.location.href = "#home";
                    } else {
                        error.innerHTML = "用户名或密码不正确";
                    }
                })
                .error(function () {
                    alert('登录失败，因网络原因无法登陆');
                });
        }
    })

    .controller('registerCtrl', function(){

    });



