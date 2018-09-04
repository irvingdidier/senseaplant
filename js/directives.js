'use strict';

//////////////////////////////////////////////////////////////////////////
//				Directivas
//////////////////////////////////////////////////////////////////////////

/*
    Footer
*/
app.directive('dirFooter', function() {

    return {
        restrict: 'E',
        templateUrl: 'view/directives/footer.directive.html'
    };

});

/*
    Toolbar Desktop
*/
app.directive('dirToolbarDesk', function() {

    return {
        restrict: 'E',
        templateUrl: 'view/directives/toolbar-desk.directive.html'
    };

});

/*
    Toolbar móvil
*/
app.directive('dirToolbarMovil', function() {

    return {
        restrict: 'E',
        templateUrl: 'view/directives/toolbar-movil.directive.html'
    };

});

/*
  Zooom in image
*/
app.directive('ngElevateZoom', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            //Will watch for changes on the attribute
            attrs.$observe('zoomImage', function () {
                linkElevateZoom();
            })

            function linkElevateZoom() {
                //Check if its not empty
                if (!attrs.zoomImage) return;

                element.attr('data-zoom-image', attrs.zoomImage);
                $(element).elevateZoom({ zoomType: "inner", cursor: "crosshair" });
            }

            linkElevateZoom();

        }
    };
});

/*
    compara datos
*/
app.directive('sameAs', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            ngModel.$parsers.unshift(validate);

            // Force-trigger the parsing pipeline.
            scope.$watch(attrs.sameAs, function () {
                ngModel.$setViewValue(ngModel.$viewValue);
            });

            function validate(value) {
                var isValid = scope.$eval(attrs.sameAs) == value;

                ngModel.$setValidity('same-as', isValid);

                return isValid ? value : undefined;
            }
        }
    };
});

/*
    detecta cuando presionas enter
*/
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
