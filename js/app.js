'use strict';

var app = angular.module( 'app', [ 'ngRoute', 'ui.map', 'ngMap', 'ui.event', 'ui.bootstrap', 'ngAnimate', 'ngCookies', 'flow', 'ngMaterial', 'ngMessages', 'angular-cookie-law', 'angulike' ] )
.config( function( $routeProvider, $locationProvider  ) {

  // $locationProvider.html5Mode(true);

  $routeProvider
	.when( '/', {		// home
		controller: 'home',			
		templateUrl: 'view/home.html'
	} )
  .when( '/iniciar_sesion', {   // Iniciar sesión
    controller: 'iniciar_sesion',     
    templateUrl: 'view/iniciar_sesion.html'
  } )
  .when( '/tosense', {   // To Sense
    controller: 'tosense',     
    templateUrl: 'view/tosense.html'
  } )
  .when( '/cuidados', {   // Términos y condiciones
    controller: 'cuidados',     
    templateUrl: 'view/cuidados.html'
  } )
  .when( '/contactanos', {   // Contáctanos
    controller: 'contactanos',     
    templateUrl: 'view/contactanos.html'
  } )
  .when( '/planta/:idplant', {   // Visualizar Planta
    controller: 'planta',     
    templateUrl: 'view/planta.html'
  } )
  .when( '/legal_privacidad', {   // Términos de legal y privacidad
    controller: 'legal_privacidad',     
    templateUrl: 'view/legal/legal_privacidad.html'
  } )
  .when( '/quienes_somos', {    // Quiénes somos
    controller: 'quienes_somos',      
    templateUrl: 'view/legal/quienes_somos.html'
  } ) 
  .when( '/terminos_condiciones', {   // Términos y condiciones
    controller: 'terminos_condiciones',     
    templateUrl: 'view/legal/terminos_condiciones.html'
  } )
  .when( '/restablecer_contrasena', {   // Restablecer contraseña
    controller: 'restablecer_contrasena',     
    templateUrl: 'view/restablecer_contrasena.html'
  } )
  .when( '/cambiar_contrasena/:keyid', {   // Cambiar contraseña
    controller: 'cambiar_contrasena',     
    templateUrl: 'view/cambiar_contrasena.html'
  } )
  .when( '/registro', {   // Cambiar contraseña
    controller: 'registro',     
    templateUrl: 'view/registro.html'
  } )
	.otherwise(	{
		redirectTo: '/' // En caso de que no exista una página hace esto <----
	} );
} );

app.run(['$rootScope', '$mdSidenav', '$location', '$mdDialog', '$mdMedia', '$http', function (rootScope, mdSidenav, location, mdDialog, mdMedia, http ) {

  rootScope.urlHost = 'http://localhost/cands/senseaplant';

  rootScope.iniciar = function () {
    mdDialog.show({
      controller: 'iniciar_sesion',
      templateUrl: 'view/iniciar_sesion.html',
      parent: angular.element(document.body),
      clickOutsideToClose: false,
      fullscreen: (mdMedia('sm') || mdMedia('xs'))
    })
  };

  rootScope.cerrar = function () {
    cookies.remove('id_usuario');
    window.location.reload();
  }

  rootScope.showSearch = true;

  rootScope.openSide = function () {
    mdSidenav('left').open();
  }
  rootScope.closeSide = function () {
    mdSidenav('left').close();
  }

  rootScope.goToHome = function () {
    location.path('/home');
  }

  rootScope.goToCuidados = function () {
    location.path('/cuidados');
  }
  rootScope.goToContactanos = function () {
    location.path('/contactanos');
  }
  

  http.get('data/plantas.json').success(function (data) {
    
    rootScope.plantas = data;
    
  });
  



}]);

app.config( function( $mdThemingProvider ) {

    var cafe = $mdThemingProvider.extendPalette('green', {
      '500': '3AB44A',
      'contrastDefaultColor': 'light' //may be dark

    });

    var verde = $mdThemingProvider.extendPalette('green', {
      '500': '1A765F'
    });

    $mdThemingProvider.definePalette('cafeBase', cafe);
    $mdThemingProvider.definePalette('verdeBase', verde);

    $mdThemingProvider.theme('default' )
      .primaryPalette( 'cafeBase')
      .accentPalette( 'verdeBase');

      $mdThemingProvider.theme('thWhite', 'default' )
      .primaryPalette( 'light-green', 'A700' );
});

app.config(function($compileProvider){
   //other configuration code here
   $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp):/);
   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);
});

