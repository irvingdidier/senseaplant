'use strict';


//////////////////////////////////////////////////////////////////////////
//				Controladores Iniciales
//////////////////////////////////////////////////////////////////////////

/*
  Login
*/
app.controller( 'iniciar_sesion', [ '$scope', '$location', '$cookies', '$mdDialog', '$rootScope', function(scope, location, cookies, mdDialog, rootScope) {

    scope.login = {};
    scope.resultado = '';
    scope.registro = function () {
       location.path('/registro');
    }
    //
    scope.enviar = function () {

        if (!scope.loginForm.$valid) {
            scope.showErrors = true;
        }
        else {
            // var data = scope.login;
            // sel_login.getRequest(data).then(
            //     function (result) {

            //         if (result.data.length > 0) {
            //             var id_usuario = result.data[0].id_usuario;
            //             // console.log(result.data);
            //             cookies.put('id_usuario', id_usuario);
            //             rootScope.loggedin = true;
            //             window.location.reload();

            //         } else {
            //             scope.resultado = 'El correo y/o la contraseña son incorrectos';
            //         }

            //     }
            // );
        }
    };

    scope.cancel = function () {
        mdDialog.cancel();
    };

}]);

/*
    Home
*/
app.controller( 'home', [ '$scope', '$location', '$cookies', '$mdDialog', '$rootScope', 

    function( scope, location, cookies, mdDialog, rootScope ) {

    
        scope.mostrarPlanta = function (selectedItem) {

            if (selectedItem ) {
                scope.buscar.planta = '';
                window.location.assign('#/planta/' + selectedItem.id_planta);

            } else if ( scope.buscar.planta ) {

                var buscar = scope.buscar.planta.toLowerCase();

                var planta = rootScope.plantas.filter(function( p ) {
                    return p.nombre_planta.toLowerCase().indexOf(buscar) > -1;
                });

                if ( planta.length > 0 ) {
                    window.location.assign('#/planta/' + planta[0].id_planta);
                } else {
                    scope.showSearch = true;

                    mdDialog.show(
                        mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('No se encontraron resultados')
                            .textContent("No se han encontrados resultados con la plabra " + scope.buscar.planta )
                            .ariaLabel("Alert Dialog Demo")
                            .ok("Aceptar")
                    );
                }

            }
        };

        var btnSense = angular.element(document.querySelector('[senseHover]'));
    
        scope.showMenu = function () {
            scope.lista = !scope.lista;
            if (scope.lista) {
                btnSense.addClass('md-accent');
            }
            else {
                btnSense.removeClass('md-accent');
            }
        }
    
        /********************  VER PLANTAS **********************/
        scope.visualizar_categoria = function (categoria) {
            cookies.remove('categoria');
            cookies.put('categoria', categoria);
            location.path('tosense');
        };
    
        /************ Registro  **********************/
        // realiza el registro de los trabajadores
        scope.registrar = function () {
            if (!scope.formRegistro.valid) {
                scope.showErrors = true;
            }
            else {
    
                var data = scope.datos;
    
                //console.log(data);
                // registro_usuario.getRequest(data).then(
                //     function (result) { // success
    
                //         if (result.data > 0) {
                //             // scope.resultado = 'El correo electrónico ' + scope.datos.correo_electronico + ' ya se encuentra registrado por otro usuario.';
                //             mdDialog.show(
                //                 mdDialog.alert()
                //                     .clickOutsideToClose(false)
                //                     .title('Mensaje')
                //                     .textContent("Registro satisfactorio")
                //                     .ariaLabel("Alert Dialog Demo")
                //                     .ok("Aceptar")
                //             );
                //             window.location.reload();
                //         }
                //         else {
                //             // scope.resultado = 'El correo electrónico ' + scope.datos.correo_electronico + ' ya se encuentra registrado por otro usuario.';
                //             mdDialog.show(
                //                 mdDialog.alert()
                //                     .clickOutsideToClose(false)
                //                     .title('Mensaje')
                //                     .textContent("El correo ya se encuentra en uso por otro usuario...")
                //                     .ariaLabel("Alert Dialog Demo")
                //                     .ok("Aceptar")
                //             );
                //         }
    
    
                //     }
                // );
    
            };
        };
    
        scope.popoverdinamico1 = {
            templateUrl: 'popover1.html',
            html: true,
    
        };
    
        scope.popoverdinamico2 = {
            templateUrl: 'popover2.html',
            html: true
        };
        scope.popoverdinamico3 = {
            templateUrl: 'popover3.html',
            html: true
        };

    }

]);

/*
    To sense
*/
app.controller( 'tosense', [ '$scope', '$rootScope', '$cookies', '$mdSidenav',

    function( scope, rootScope, cookies, mdSidenav ) {

        var categoria = cookies.get('categoria');

        resetGaleriaPlantas(categoria);

    
        scope.mostrarPlanta = function (selectedItem) {

            if (selectedItem ) {
                scope.buscar.planta = '';
                window.location.assign('#/planta/' + selectedItem.id_planta);

            } else if ( scope.buscar.planta ) {

                var buscar = scope.buscar.planta.toLowerCase();

                var planta = rootScope.plantas.filter(function( p ) {
                    return p.nombre_planta.toLowerCase().indexOf(buscar) > -1;
                });

                if ( planta.length > 0 ) {
                    window.location.assign('#/planta/' + planta[0].id_planta);
                } else {
                    scope.showSearch = true;

                    mdDialog.show(
                        mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('No se encontraron resultados')
                            .textContent("No se han encontrados resultados con la plabra " + scope.buscar.planta )
                            .ariaLabel("Alert Dialog Demo")
                            .ok("Aceptar")
                    );
                }

            }
        };
    
        /********************  VER DESCRIPCION PLANTA **********************/
        scope.visualizar_planta = function (id_planta) {
            // location.url( '/planta/' + id_planta );
            window.location.assign('#/planta/' + id_planta);
        }
    
        scope.visualizar_categoria = function (cat) {

            if (cat !== categoria) {
    
                mdSidenav('left').close();
                cookies.remove('categoria');
                cookies.put('categoria', cat);
                // Genera el listado de galeria_plantas
                categoria = cat;
                
                resetGaleriaPlantas(categoria);
            }
        };
    
        var btnSense = angular.element(document.querySelector('[senseHover]'));
    
        scope.showMenu = function () {
            scope.lista = !scope.lista;
            if (scope.lista) {
                btnSense.addClass('md-accent');
            }
            else {
                btnSense.removeClass('md-accent');
            }
        }
    
        rootScope.i = 0;


        function resetGaleriaPlantas(cat) {
            scope.galeria_plantas = {};
                
            scope.galeria_plantas = rootScope.plantas.filter( function(p) {
                return p.categoria.toLowerCase() == cat.toLowerCase();
            });
        }

    }

]);

/*
    planta
*/
app.controller('planta', [ '$scope', '$rootScope', '$location', '$routeParams', '$cookies',

    function ( scope, rootScope, location, routeParams, cookies ) {

        function recargar() {
            if (rootScope.i < 1) {
                rootScope.i++;
                window.location.reload();
            }
        }
    
        recargar();

        var id_planta = routeParams.idplant;

        if ( id_planta ) {
            var planta_sel = rootScope.plantas.filter(function( p ) {
                return p.id_planta == id_planta;
            });
    
            if ( planta_sel.length > 0 ) {
                scope.planta = planta_sel[0];
            } else {
                location.path('/');
            }
        } else {
            location.path('/');
        }

        scope.mostrarPlanta = function (selectedItem) {

            if (selectedItem ) {
                scope.buscar.planta = '';
                window.location.assign('#/planta/' + selectedItem.id_planta);

            } else if ( scope.buscar.planta ) {

                var buscar = scope.buscar.planta.toLowerCase();

                var planta = rootScope.plantas.filter(function( p ) {
                    return p.nombre_planta.toLowerCase().indexOf(buscar) > -1;
                });

                if ( planta.length > 0 ) {
                    window.location.assign('#/planta/' + planta[0].id_planta);
                } else {
                    scope.showSearch = true;

                    mdDialog.show(
                        mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('No se encontraron resultados')
                            .textContent("No se han encontrados resultados con la plabra " + scope.buscar.planta )
                            .ariaLabel("Alert Dialog Demo")
                            .ok("Aceptar")
                    );
                }

            }
        };
    
        /********************  VER PLANTAS **********************/
        scope.visualizar_categoria = function (categoria) {
            cookies.remove('categoria');
            cookies.put('categoria', categoria);
            scope.changeView = location.path('/tosense');
        };
    
        var btnSense = angular.element(document.querySelector('[senseHover]'));
    
        scope.showMenu = function () {
            scope.lista = !scope.lista;
            if (scope.lista) {
                btnSense.addClass('md-accent');
            }
            else {
                btnSense.removeClass('md-accent');
            }
        };
    
        scope.back = function (categoria) {
            cookies.remove('categoria');
            cookies.put('categoria', categoria);
            scope.changeView = location.path('/tosense');
        }
    
        scope.whatsapp = function (id_planta) {
            scope.url = 'http%3A%2F%2Fconsultingsupport.ddns.net%2Fsenseaplant%2F%23%2Fplanta%2F' + id_planta;
        }

    }

]);

/*
    Cuidados
*/
app.controller('cuidados', ['$scope', '$rootScope', '$location', '$cookies',

    function(scope, rootScope, location, cookies ) {


        scope.mostrarPlanta = function (selectedItem) {

            if (selectedItem ) {
                scope.buscar.planta = '';
                window.location.assign('#/planta/' + selectedItem.id_planta);

            } else if ( scope.buscar.planta ) {

                var buscar = scope.buscar.planta.toLowerCase();

                var planta = rootScope.plantas.filter(function( p ) {
                    return p.nombre_planta.toLowerCase().indexOf(buscar) > -1;
                });

                if ( planta.length > 0 ) {
                    window.location.assign('#/planta/' + planta[0].id_planta);
                } else {
                    scope.showSearch = true;

                    mdDialog.show(
                        mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('No se encontraron resultados')
                            .textContent("No se han encontrados resultados con la plabra " + scope.buscar.planta )
                            .ariaLabel("Alert Dialog Demo")
                            .ok("Aceptar")
                    );
                }

            }
        };

        /********************  VER PLANTAS **********************/
        scope.visualizar_categoria = function (categoria) {
            cookies.remove('categoria');
            cookies.put('categoria', categoria);
            scope.changeView = location.path('/tosense');
        };

        var btnSense = angular.element(document.querySelector('[senseHover]'));

        scope.showMenu = function () {
            scope.lista = !scope.lista;
            if (scope.lista) {
                btnSense.addClass('md-accent');
            }
            else {
                btnSense.removeClass('md-accent');
            }
        };

        scope.subcategoria = false;
        scope.mostrar_subcategorias = function (id, sub) {
            scope.subcategoria = true;
            scope.sub = sub;
            scope.id = id;
        }

        scope.mostrarCategoria = function () {
            scope.subcategoria = false;
        }

    }

]);

/*
    Contactanos
*/
app.controller('contactanos', [ '$scope', '$rootScope', '$location', '$cookies', '$mdDialog',

    function( scope, rootScope, location, cookies, mdDialog ) {

        scope.mostrarPlanta = function (selectedItem) {

            if (selectedItem ) {
                scope.buscar.planta = '';
                window.location.assign('#/planta/' + selectedItem.id_planta);

            } else if ( scope.buscar.planta ) {

                var buscar = scope.buscar.planta.toLowerCase();

                var planta = rootScope.plantas.filter(function( p ) {
                    return p.nombre_planta.toLowerCase().indexOf(buscar) > -1;
                });

                if ( planta.length > 0 ) {
                    window.location.assign('#/planta/' + planta[0].id_planta);
                } else {
                    scope.showSearch = true;

                    mdDialog.show(
                        mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('No se encontraron resultados')
                            .textContent("No se han encontrados resultados con la plabra " + scope.buscar.planta )
                            .ariaLabel("Alert Dialog Demo")
                            .ok("Aceptar")
                    );
                }

            }
        };

        /********************  VER PLANTAS **********************/
        scope.visualizar_categoria = function (id_categoria) {
            cookies.remove('id_categoria');
            cookies.put('id_categoria', id_categoria);
            scope.changeView = location.path('/tosense');
        };

        var btnSense = angular.element(document.querySelector('[senseHover]'));

        scope.showMenu = function () {
            scope.lista = !scope.lista;
            if (scope.lista) {
                btnSense.addClass('md-accent');
            }
            else {
                btnSense.removeClass('md-accent');
            }
        };

        scope.enviarMensaje = function (form) {
            if (!form.valid) {
                scope.showErrors = true;
            }
            else {
                // scope.progress = true;
                // var data = { nombre: scope.contacto.nombre, correo: scope.contacto.correo, mensaje: scope.contacto.mensaje };
                // sendmail.getRequest(data).then(
                //     function (result) { // success

                //         console.log(result.data);

                //         if (result.data > 0) {
                //             mdDialog.show(
                //                 mdDialog.alert()
                //                     .clickOutsideToClose(false)
                //                     .title('Mensaje')
                //                     .textContent("¡Se ha mandado tu mensaje!")
                //                     .ariaLabel("Alert Dialog Demo")
                //             );
                //             window.location.reload();
                //         }
                //     }
                // );
            }
        };

    }

]); 

/*
    quienes_somos
*/
app.controller('quienes_somos', [ '$scope', '$rootScope', '$location', '$cookies',
    
    function ( scope, rootScope, location, cookies ) {

        scope.mostrarPlanta = function (selectedItem) {

            if (selectedItem ) {
                scope.buscar.planta = '';
                window.location.assign('#/planta/' + selectedItem.id_planta);

            } else if ( scope.buscar.planta ) {

                var buscar = scope.buscar.planta.toLowerCase();

                var planta = rootScope.plantas.filter(function( p ) {
                    return p.nombre_planta.toLowerCase().indexOf(buscar) > -1;
                });

                if ( planta.length > 0 ) {
                    window.location.assign('#/planta/' + planta[0].id_planta);
                } else {
                    scope.showSearch = true;

                    mdDialog.show(
                        mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('No se encontraron resultados')
                            .textContent("No se han encontrados resultados con la plabra " + scope.buscar.planta )
                            .ariaLabel("Alert Dialog Demo")
                            .ok("Aceptar")
                    );
                }

            }
        };
    
        /********************  VER PLANTAS **********************/
        scope.visualizar_categoria = function (id_categoria) {
            cookies.remove('id_categoria');
            cookies.put('id_categoria', id_categoria);
            scope.changeView = location.path('/tosense');
        };
    
        var btnSense = angular.element(document.querySelector('[senseHover]'));
    
        scope.showMenu = function () {
            scope.lista = !scope.lista;
            if (scope.lista) {
                btnSense.addClass('md-accent');
            }
            else {
                btnSense.removeClass('md-accent');
            }
        };
    
    }
]);

/*
    legal_privacidad
*/
app.controller('legal_privacidad', [ '$scope', '$rootScope', '$location', '$cookies',
    
    function ( scope, rootScope, location, cookies ) {


        scope.mostrarPlanta = function (selectedItem) {

            if (selectedItem ) {
                scope.buscar.planta = '';
                window.location.assign('#/planta/' + selectedItem.id_planta);

            } else if ( scope.buscar.planta ) {

                var buscar = scope.buscar.planta.toLowerCase();

                var planta = rootScope.plantas.filter(function( p ) {
                    return p.nombre_planta.toLowerCase().indexOf(buscar) > -1;
                });

                if ( planta.length > 0 ) {
                    window.location.assign('#/planta/' + planta[0].id_planta);
                } else {
                    scope.showSearch = true;

                    mdDialog.show(
                        mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('No se encontraron resultados')
                            .textContent("No se han encontrados resultados con la plabra " + scope.buscar.planta )
                            .ariaLabel("Alert Dialog Demo")
                            .ok("Aceptar")
                    );
                }

            }
        };
    
        /********************  VER PLANTAS **********************/
        scope.visualizar_categoria = function (id_categoria) {
            cookies.remove('id_categoria');
            cookies.put('id_categoria', id_categoria);
            scope.changeView = location.path('/tosense');
        };
    
        var btnSense = angular.element(document.querySelector('[senseHover]'));
    
        scope.showMenu = function () {
            scope.lista = !scope.lista;
            if (scope.lista) {
                btnSense.addClass('md-accent');
            }
            else {
                btnSense.removeClass('md-accent');
            }
        };
    
    }
]);

/*
    legal_privacidad
*/
app.controller('terminos_condiciones', [ '$scope', '$rootScope', '$location', '$cookies',
    
    function ( scope, rootScope, location, cookies ) {

        scope.mostrarPlanta = function (selectedItem) {

            if (selectedItem ) {
                scope.buscar.planta = '';
                window.location.assign('#/planta/' + selectedItem.id_planta);

            } else if ( scope.buscar.planta ) {

                var buscar = scope.buscar.planta.toLowerCase();

                var planta = rootScope.plantas.filter(function( p ) {
                    return p.nombre_planta.toLowerCase().indexOf(buscar) > -1;
                });

                if ( planta.length > 0 ) {
                    window.location.assign('#/planta/' + planta[0].id_planta);
                } else {
                    scope.showSearch = true;

                    mdDialog.show(
                        mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title('No se encontraron resultados')
                            .textContent("No se han encontrados resultados con la plabra " + scope.buscar.planta )
                            .ariaLabel("Alert Dialog Demo")
                            .ok("Aceptar")
                    );
                }

            }
        };
    
        /********************  VER PLANTAS **********************/
        scope.visualizar_categoria = function (id_categoria) {
            cookies.remove('id_categoria');
            cookies.put('id_categoria', id_categoria);
            scope.changeView = location.path('/tosense');
        };
    
        var btnSense = angular.element(document.querySelector('[senseHover]'));
    
        scope.showMenu = function () {
            scope.lista = !scope.lista;
            if (scope.lista) {
                btnSense.addClass('md-accent');
            }
            else {
                btnSense.removeClass('md-accent');
            }
        };
    
    }
]);

//Restablecer contraseña
app.controller('restablecer_contrasena', function ( $scope ) {

    var self = this;
    self.activated = true;
    self.determinateValue = 0;

    $scope.enviarContra = function () {
        if (!$scope.formRes.$valid) {
            $scope.showErrors = true;
        }
        else {
            // $scope.progress = true;
            // var data = { correo_electronico: $scope.datos.correo_electronico };

            // sendpassword.getRequest(data).then(
            //     function (result) { // success
            //         if (result.data > 0) {
            //             $scope.datos.correo_electronico = "";
            //             $scope.progress = false;
            //             $scope.resultado = 'Se ha enviado un mail al correo electrónico proporcionado.';
            //         }
            //         else {
            //             $scope.resultado = 'El correo que proporcionaste no existe.';
            //         }
            //     }
            // );
        }
    };
});

//Restablecer contraseña
app.controller('cambiar_contrasena', function ($scope, $location, $mdDialog, $interval, $routeParams) {

    var key = { key: $routeParams.keyid }

    $scope.cambiarContra = function () {
        if (!$scope.formRes.$valid) {
            $scope.showErrors = true;
        }
        else {

            // var data = { key: $routeParams.keyid, contrasena: $scope.datos.contrasena };
            // upd_contrasena.getRequest(data).then(
            //     function (result) { // success

            //         //console.log( result.data );

            //         if (result.data === 0) {

            //             $scope.resultado = 'Contraseña no modificada.';
            //         }
            //         else {
            //             // $scope.resultado = 'El correo electrónico ' + $scope.datos.correo_electronico + ' ya se encuentra registrado por otro usuario.';
            //             $mdDialog.show(
            //                 $mdDialog.alert()
            //                     .clickOutsideToClose(false)
            //                     .title('Mensaje')
            //                     .textContent("Contraseña modificada correctamente")
            //                     .ariaLabel("Alert Dialog Demo")
            //                     .ok("Aceptar")
            //             );

            //             $interval(function () {

            //             }, 2000);

            //             $location.path('/home');
            //             $scope.datos.contrasena = "";
            //             $scope.datos.r_contrasena = "";
            //             $scope.resultado = 'Contraseña modificada.';
            //         }
            //     }
            // );

        }
    };
});

//Registro
app.controller('registro', function ($scope, $location, $mdDialog) {

    $scope.registrar = function () {
        if (!$scope.formRegistro.$valid) {
            $scope.showErrors = true;
        }
        else {

            // var data = $scope.datos;

            // //console.log(data);
            // registro_usuario.getRequest(data).then(
            //     function (result) { // success

            //         if (result.data > 0) {
            //             // $scope.resultado = 'El correo electrónico ' + $scope.datos.correo_electronico + ' ya se encuentra registrado por otro usuario.';
            //             $mdDialog.show(
            //                 $mdDialog.alert()
            //                     .clickOutsideToClose(false)
            //                     .title('Mensaje')
            //                     .textContent("Registro satisfactorio")
            //                     .ariaLabel("Alert Dialog Demo")
            //                     .ok("Aceptar")
            //             );
            //             $scope.datos = "";
            //         }
            //         else {
            //             // $scope.resultado = 'El correo electrónico ' + $scope.datos.correo_electronico + ' ya se encuentra registrado por otro usuario.';
            //             $mdDialog.show(
            //                 $mdDialog.alert()
            //                     .clickOutsideToClose(false)
            //                     .title('Mensaje')
            //                     .textContent("El correo ya se encuentra en uso por otro usuario...")
            //                     .ariaLabel("Alert Dialog Demo")
            //                     .ok("Aceptar")
            //             );
            //         }
            //     }
            // );
        };
    };

});