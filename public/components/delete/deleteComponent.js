function deleteComponent($scope, $mdDialog, LibroService, $rootScope) {
    var $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.deleteBook = function(ev) {
            var confirm = $mdDialog.confirm()
              .title('Eliminar Registro')
              .textContent('¿Esta seguro que desea eliminar el registro? Una vez eliminado, no podrá volver a recuperarlo.')
              .targetEvent(ev)
              .cancel('Cancelar')
              .ok('Aceptar');
    
            $mdDialog.show(confirm).then(function() {
                LibroService.eliminarLibro($ctrl.libro)
                    .then((response) => {
                        $rootScope.$broadcast('refresh_list', {});
                    }, (error) => {
                        console.log(error);
                    });
            }, function() {
                
            });
        }
    }
}

angular.module('app.controllers').component('deleteComponent', {
    templateUrl: './components/delete/deleteComponent.html',
    controller: deleteComponent,
    bindings: {
        libro: "="
    }
});