function addController ($scope, $element, $attrs, $mdDialog) {

    this.openModal = function(ev) {
        $mdDialog.show({
            controller: addFormController,
            templateUrl: './components/add/addForm.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }

}

function addFormController ($scope, $rootScope, LibroService, $mdDialog) {

    $scope.libro = {};

    $scope.enviar = function() {
        let libro = {
            nombre: $scope.libro.nombre,
            editorial: $scope.libro.editorial,
            autor: $scope.libro.autor,
            edicion: $scope.libro.edicion
        }
        LibroService.insertarLibro(libro)
            .then((response) => {
                $mdDialog.hide();
                $rootScope.$broadcast('refresh_list', {});
            }, (error) => {
                console.log(error);
            });
    }
}

angular.module('app.controllers').component('addComponent', {
    templateUrl: './components/add/addComponent.html',
    controller: addController
});