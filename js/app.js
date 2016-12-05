/**
 * Created by Sunny on 16/11/29.
 */
var myApp = angular.module('myApp', ['ui.router', 'myApp.controllers']);

myApp.config(['$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.when('', '/home');
    $stateProvider
        //主页
        .state('home', {
            url:'/home',
            cache:'false',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        })
        //领养
        .state('adopt',{
            url: '/adopt',
            cache:'false',
            templateUrl: 'templates/adopt.html',
            controller: 'adoptCtrl'
        })
        //寻宠启事
        .state('lost',{
            url: '/lost',
            cache:'false',
            templateUrl: 'templates/lost.html',
            controller: 'lostCtrl'
        })

        //论坛
        .state('forum', {
            url: '/forum',
            cache:'false',
            templateUrl: 'templates/forum.html',
            controller: 'forumCtrl'
        })

        .state('forum-detail', {
            url: '/forum/:forumId',
            cache:'false',
            templateUrl: 'templates/forum-detail.html',
            controller: 'forumDetailCtrl'
        })

        //登陆
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })

        //注册
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'registerCtrl'
        })
}]);
