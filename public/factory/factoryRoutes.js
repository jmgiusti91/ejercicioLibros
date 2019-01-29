angular.module('appLibros')
    .factory('factoryRoutes', function() {
        let objeto = {};

        objeto.nombre = "Factory Routes";

        objeto.RutaLibro = "http://localhost:3000/api/libros/";

        return objeto;
    });