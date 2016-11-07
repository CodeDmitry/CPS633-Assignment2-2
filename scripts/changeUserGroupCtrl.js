(function() {
    'use strict';
    
    var app = angular.module('app');

    var model = {
        'user_id': null,
        'groupName': null
    };
    
    var changeUserGroup = function() {
        if (!('core' in window) 
        || !('setGroup' in core)) {
            alert('this feature requires system core, core.setGroup to be exposed.');
            return;
        }    
        
        var response = core.setGroup(model.user_id, model.groupName);
        alert(response.message); 
    };
    
    app.controller('changeUserGroupCtrl', ['$scope', function($scope) {
        $scope.model = model;
        $scope.changeUserGroup = changeUserGroup;
    }]);
})();