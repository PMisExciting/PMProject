/**
 * Created by Sunny on 16/11/29.
 */
angular.module('myApp.controllers', [])
    // 主页信息内容
.controller('homeCtrl', function($rootScope, $scope, $http) {
    $rootScope.hostUrl = 'localhost';

    $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetForums")
        .success(function(ret) {
            if (ret != null && ret.length != 0) {
                $rootScope.forums = ret;
            }
        })
        .error(function() {
            alert('因网络原因无法获取信息');
        });

    $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetHotForums")
        .success(function(ret) {
            if (ret != null && ret.length != 0) {
                $scope.hotforums = ret;
            } else {
                document.getElementsByClassName("null-error")[0].innerHTML = "没有新帖,快去发布吧";
            }
        }).error(function() {
        alert('因网络原因无法获取信息');
    });

    $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetNewForums")
        .success(function(ret) {
            if (ret != null && ret.length != 0) {
                $scope.newforums = ret;
            } else {
                document.getElementsByClassName("null-error")[1].innerHTML = "没有新帖,快去发布吧";
            }
        }).error(function() {
        alert('因网络原因无法获取信息');
    });


})

.controller('adoptCtrl', function() {

})

.controller('lostCtrl', function() {

})

.controller('forumCtrl', function($scope, $http, $rootScope) {
    var forums = $rootScope.forums;
    if (forums != null && forums.length != 0) {
        $scope.forumsLength = forums.length;

        //初始显示6条帖子,每次点击"更多"额外多显示6条
        if (forums.length < 6) { //如果当前总数小于6,则改变按钮内容
            $scope.forumsPart = $rootScope.forums;
            document.getElementsByClassName("more-forum")[0].innerHTML = "没有更多啦";
        } else { //否则只显示前6条,并记录Index
            $scope.forumsPart = $rootScope.forums.slice(0, 6);
            $scope.index = 6;
        }
    }
    else {
        document.getElementsByClassName("more-forum").innerHTML = "没有更多啦";
    }

    //获取评论数前六的帖子
    $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetHotForums")
        .success(function(ret) {
            if (ret != null && ret.length != 0) {
                $scope.hotforums = ret;
            } else {
                document.getElementsByClassName("null-error")[0].innerHTML = "没有新帖,快去发布吧";
            }
        }).error(function() {
            alert('因网络原因无法获取信息');
        });

    //如果当前有有效用户,则获取该用户发布的帖子
    if ($rootScope.user) {
        $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetForumsByUserId", {
                params: {
                    userId: $rootScope.userId
                }
            })
            .success(function(ret) {
                if (ret != null && ret.length != 0) {
                    $scope.myforums = ret;
                } else {
                    document.getElementsByClassName("null-error")[1].innerHTML = "没有新帖,快去发布吧";
                }
            }).error(function() {
                alert('因网络原因无法获取信息');
            });
    } else {
        document.getElementsByClassName("null-error")[1].innerHTML = "<a href=\"#login\">请先登录</a>";
    }

    $scope.moreForums = function() {
        //如果剩余的文章数大于6,则添加6条,并记录index
        if ($scope.forumsLength - $scope.forumsPart.length > 6) {
            $scope.forumsPart = $rootScope.forums.slice(0, $scope.index + 6);
            $scope.index += 6;
        } else { //否则把剩余的内容全部添加到当前展示的数组中,并改变按钮内容
            $scope.forumsPart = $rootScope.forums;
            document.getElementsByClassName("more-forum")[0].innerHTML = "没有更多啦";
        }
    }
})

.controller('forumDetailCtrl', function($rootScope, $scope, $stateParams, $http, $sce) {

    //获取当前帖子的所有评论
    $scope.getComment = function() {
        $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/GetComments", {
                params: {
                    forumId: $scope.forum.forumId
                }
            })
            .success(function(ret) {
                if (ret != null && ret.length != 0)
                    $scope.comments = ret;
            })
            .error(function() {
                alert("因网络原因无法获取信息");
            })
    };

    var id = $stateParams.forumId;
    for (var i = 0; i < $rootScope.forums.length; i++) {
        if ($rootScope.forums[i].forumId == id) {
            $scope.forum = $rootScope.forums[i];
            var content = $scope.forum.forumContent.replace(/\r\n/g,"<br/>");
            content=content.replace(/\n/g,"<br/>");
            $scope.forumContent =  $sce.trustAsHtml(content);
            $scope.getComment();
            break;
        }
    }
    //添加评论
    $scope.addComment = function() {
        var str = document.getElementById("myComment").value;
        if (str != null && str.length > 0) {
            while (str.lastIndexOf(" ") >= 0) {
                str = str.replace(" ", "");
            }
            if (str.length == 0) {
                alert("输入不能全为空");
            } else {
                $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/AddComment", {
                        params: {
                            userId: $rootScope.userId,
                            forumId: $scope.forum.forumId,
                            comment: str
                        }
                    })
                    .success(function(ret) {
                        $scope.forum.commentNum += 1;
                        $scope.comments = null;
                        document.getElementById("myComment").value = "";
                        $scope.getComment();

                    })
                    .error(function() {
                        alert('因网络原因无法进行评论');
                    })
            }
        } else {
            alert("评论内容不能为空");
        }
    }

    $scope.deleteForum = function(){
        var confirm = window.confirm("确定要删除本帖?");
        if(confirm)
        $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/DeleteForum", {
                params: {
                    forumId: $scope.forum.forumId
                }
            })
            .success(function(ret) {
                window.location.href = "#forum";
                alert("删除帖子成功!");
            })
            .error(function() {
                alert('因网络原因无法删除帖子');
            })
    }

    $scope.deleteComment = function(commentId) {
        var confirm = window.confirm("确定要删除评论?");
        if(confirm)
        $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/DeleteComment", {
                params: {
                    commentId: commentId
                }
            })
            .success(function(ret) {
                $scope.forum.commentNum -= 1;
                $scope.comments = null;
                $scope.getComment();
                alert("删除评论成功!");
            })
            .error(function() {
                alert('因网络原因无法删除评论');
            })
    }

})

.controller('newForumCtrl', function($scope, $http, $rootScope) {

    //判断输入的内容是否为空或者全部为空格
    $scope.isValid = function(str) {
        if (str != null && str.length > 0) {
            var tmp = str;
            while (tmp.lastIndexOf(" ") >= 0) {
                tmp = tmp.replace(" ", "");
            }
            if (tmp.length == 0)
                return false;
            else
                return true;
        }
        return false;
    }

    $scope.cancelNewForum = function() {
        window.location.href = "#forum";
    }

    //添加新的帖子
    $scope.addNewForum = function() {
        var title = document.getElementById("inputTitle").value;
        var content = document.getElementById("inputContent").value;

        if ($scope.isValid(title) && $scope.isValid(content)) {
            $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/AddForum", {
                    params: {
                        title: title,
                        content: content,
                        userId: $rootScope.user.userId
                    }
                })
                .success(function(ret) {
                    window.location.href = "#forum";
                })
                .error(function() {
                    alert('因网络原因无法发布');
                });

        } else
            alert("输入内容不能为空");
    }
})

.controller('loginCtrl', function($rootScope, $scope, $http) {

    var error = document.getElementById("login-error");

    $scope.userLogin = function() {

        error.innerHTML = "";
        $http.get("http://" + $rootScope.hostUrl + ":8080/PMServer/UserLogin", {
                params: {
                    username: $scope.username,
                    password: $scope.password
                }
            })
            .success(function(ret) {
                if (ret != null && ret[0] != null) {
                    $rootScope.user = ret[0];
                    $rootScope.userId = $rootScope.user.userId;
                    window.location.href = "#home";
                } else {
                    error.innerHTML = "用户名或密码不正确";
                }
            })
            .error(function() {
                alert('登录失败，因网络原因无法登陆');
            });
    }
})

.controller('registerCtrl', function() {

});