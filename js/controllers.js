/**
 * Created by Sunny on 16/11/29.
 */
angular.module('myApp.controllers', [])
    // 主页信息内容
    .controller('homeCtrl', function($rootScope){
        $rootScope.hostUrl = 'localhost';
    })

    .controller('adoptCtrl', function(){

    })

    .controller('lostCtrl', function(){

    })

    .controller('forumCtrl', function($scope){
        $scope.forums = [
            {forumTitle:"论我为什么要起一个这样的标题名", forumContent:"测试内容1", forumTime:"2016-12-03 20:00:00", userName:"用户1", commentNum:"10", forumId:0},
            {forumTitle:"因为它看起来肥肠好看啊哈哈哈哈哈", forumContent:"测试内容2", forumTime:"2016-12-03 20:00:00", userName:"用户2", commentNum:"100", forumId:1},
            {forumTitle:"短小精悍", forumContent:"测试内容3", forumTime:"2016-12-03 20:00:00", userName:"用户3", commentNum:"0", forumId:2},
            {forumTitle:"论我为什么要起一个这样的标题名", forumContent:"测试内容1", forumTime:"2016-12-03 20:00:00", userName:"用户1", commentNum:"10", forumId:0},
            {forumTitle:"因为它看起来肥肠好看啊哈哈哈哈哈", forumContent:"测试内容2", forumTime:"2016-12-03 20:00:00", userName:"用户2", commentNum:"100", forumId:1},
            {forumTitle:"短小精悍", forumContent:"测试内容3", forumTime:"2016-12-03 20:00:00", userName:"用户3", commentNum:"0", forumId:2},
            {forumTitle:"短小精悍", forumContent:"测试内容3", forumTime:"2016-12-03 20:00:00", userName:"用户3", commentNum:"0", forumId:2}
        ];
    })

    .controller('forumDetailCtrl', function(){

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



