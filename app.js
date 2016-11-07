(function() {
    var app = angular.module('app', []);
    
    app.run(function($rootScope) {
        $rootScope.activePage = 'home.html';
    });
    
    app.directive('navigationBar', () => {
        return {
            restrict: 'E',
            templateUrl: 'navigation-bar-template',
            transclude: true,
            replace: true
        };
    });
})();