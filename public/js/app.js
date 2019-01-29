angular.module('appLibros', ['ngRoute', 'app.controllers', 'ngMaterial', 'ngMessages', 'md.data.table'])

.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'inicio.html',
            controller: 'controlInicio'
        })
        .otherwise({
            redirectTo: '/'
        });

});