angular.module('app.controllers', [])

.controller('controlInicio', function($scope, LibroService) {

    'use strict';

    $scope.selected = [];

    $scope.options = {
        boundaryLinks: true,
        rowSelection: true
    };

    $scope.query = {
        order: 'nombre',
        limit: 5,
        page: 1
    };
    
    getAllBooks($scope, LibroService);

    $scope.$on('refresh_list', function(event, data) {
        getAllBooks($scope, LibroService);
    });

    $scope.logPagination = function (page, limit) {
        //console.log('page: ', page);
        //console.log('limit: ', limit);
    }

})

function getAllBooks($scope, LibroService) {
    
    LibroService.traerTodos()
        .then((response) => {

            $scope.libros = {
                "data": response.data
            }

            search($scope);

        })
        .catch((error) => {
            console.error(error);
        });
}

function search($scope) {
    $scope.filters = [];
    $scope.$watch('filter.search', function(newValue, oldValue) {
        if(newValue != undefined){
            $scope.filters = newValue.split(" ");
        }
    })

    $scope.searachData = {};

    $scope.customSearch = function(item) {
        $scope.searachData.status = true;

        angular.forEach($scope.filters, function(value1, key) {
            $scope.searachData.tempStatus = false;
            angular.forEach(item, function(value2, key) {
                var dataType = typeof(value2);

                if(dataType == "string" && (!value2.includes('object'))){
                    if(value2.toLowerCase().includes(value1)){
                        $scope.searachData.tempStatus = true;
                    }
                } else if(dataType == "object"){
                    var num = value2.value.toString();
                    if(num.includes(value1)){
                        $scope.searachData.tempStatus = true;
                    }
                }
            });
            $scope.searachData.status = $scope.searachData.status & $scope.searachData.tempStatus;
        });

        return $scope.searachData.status;
    };
}