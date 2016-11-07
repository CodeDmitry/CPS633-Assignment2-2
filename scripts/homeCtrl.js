(function() {   
    'use strict';
    
    var app = angular.module('app');
    
    var model = {
        inputText: '',
        feedbackText: ''      
    };     

    var writeLog = function(str) {
        model.feedbackText = str + "\n" + model.feedbackText + "\n";
    };
    
    var evaluate = function(evt) {
        var res = eval(model.inputText);
        writeLog(res);
    };
    
    app.controller('homeCtrl', ['$scope', ($scope) => {
        $scope.model = model;
        $scope.evaluate = evaluate;
    }]);
})();