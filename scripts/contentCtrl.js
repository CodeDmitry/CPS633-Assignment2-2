(function() {
    'use strict';
    
    var app = angular.module('app');
    
    var model = {
        'activePage': 'home.html'
    };
    
    app.controller('contentCtrl', ['$scope', function($scope) {
        $scope.model = model;
    }]);
})();