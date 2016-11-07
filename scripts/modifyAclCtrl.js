(function() {
    'use strict';
    
    var app = angular.module('app');

    var model = {
        'user_id': null,
        'fileName': null,
        'read': false,
        'write': false,
        'execute': false
    };
    
    var setPermissions = function() {
        // alert(JSON.stringify(model, null, 4));
        if (!('core' in window) 
        || !('setPermissions' in core)) {
            alert('this feature requires system core, core.setPermissions to be exposed.');
            return;
        }
        
        var permissionSet = new Set();
        if (model.read){ permissionSet.add('read'); }
        if (model.write){ permissionSet.add('write'); }
        if (model.execute){ permissionSet.add('execute'); }        
        
        var response = core.setPermissions(model.user_id, model.fileName, permissionSet);
        alert(response.message);        
    };
    
    app.controller('modifyAclCtrl', ['$scope', function($scope) {
        $scope.model = model;
        $scope.setPermissions = setPermissions;
    }]);
})();