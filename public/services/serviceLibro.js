angular
    .module('appLibros')
    .service('LibroService', function($http, factoryRoutes) {

        this.traerTodos = traerTodos;
        this.insertarLibro = insertarLibro;
        this.eliminarLibro = eliminarLibro;

        let url = factoryRoutes.RutaLibro;

        function traerTodos() {
            return $http.get(url)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        function insertarLibro(libro) {
            return $http.post(url, libro)
                .then((response) => {
                    return response;
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function eliminarLibro(libro) {
            return $http.delete(url + libro._id)
                .then((response) => {
                    return response;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    });