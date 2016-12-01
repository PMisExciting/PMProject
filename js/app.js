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
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        })
        //领养
        .state('adopt',{
            url: '/adopt',
            templateUrl: 'templates/adopt.html',
            controller: 'adoptCtrl'
        })
        //寻宠启事
        .state('lost',{
            url: '/lost',
            templateUrl: 'templates/lost.html',
            controller: 'lostCtrl'
        })

        //论坛
        .state('forum', {
            url: '/forum',
            templateUrl: 'templates/forum.html',
            controller: 'forumCtrl'
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
