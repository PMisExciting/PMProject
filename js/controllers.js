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

    .controller('forumCtrl', function($scope, $http, $rootScope){
        $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetForums")
            .success(function(ret){
                if(ret != null && ret.length != 0){
                    $rootScope.forums = ret;
                    $scope.forumsLength = ret.length;

                    //初始显示6条帖子,每次点击"更多"额外多显示6条
                    if(ret.length < 6){ //如果当前总数小于6,则改变按钮内容
                        $scope.forumsPart = $rootScope.forums;
                        document.getElementsByClassName("more-forum")[0].innerHTML = "没有更多啦";
                    }else{ //否则只显示前6条,并记录Index
                        $scope.forumsPart = $rootScope.forums.slice(0,6);
                        $scope.index = 6;
                    }
                }else{
                    document.getElementsByClassName("more-forum").innerHTML = "没有更多啦";
                }
            })
            .error(function(){
                alert('因网络原因无法获取信息');
            });

        $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetHotForums")
            .success(function(ret){
                if(ret != null && ret.length != 0){
                    $scope.hotforums = ret;
                }else{
                    document.getElementsByClassName("null-error")[0].innerHTML = "没有新帖,快去发布吧";
                }
            }).error(function(){
                alert('因网络原因无法获取信息');
            });

        if($rootScope.user){
            $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetForumsByUserId",{params:{userId: $rootScope.userId}})
                .success(function(ret){
                    if(ret != null && ret.length != 0){
                        $scope.myforums = ret;
                    }else{
                        document.getElementsByClassName("null-error")[1].innerHTML = "没有新帖,快去发布吧";
                    }
                }).error(function(){
                    alert('因网络原因无法获取信息');
                });
        }else{
            document.getElementsByClassName("null-error")[1].innerHTML = "<a href=\"#login\">请先登录</a>";
        }

        $scope.moreForums = function(){
            //如果剩余的文章数大于6,则添加6条,并记录index
            if($scope.forumsLength-$scope.forumsPart.length > 6){
                $scope.forumsPart = $rootScope.forums.slice(0,$scope.index + 6);
                $scope.index += 6;
            }else{ //否则把剩余的内容全部添加到当前展示的数组中,并改变按钮内容
                $scope.forumsPart = $rootScope.forums;
                document.getElementsByClassName("more-forum")[0].innerHTML = "没有更多啦";
            }
        }

        $scope.addForum = function(){
            //TODO
        }
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
                        $rootScope.userId =  $rootScope.user.userId;
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



