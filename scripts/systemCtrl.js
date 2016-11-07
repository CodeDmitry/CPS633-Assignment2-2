(function() {     
    'use strict';
    
    var app = angular.module('app');
    
    var defaultModel = {
        text: '',
        active: false,
        data: {},
        dataset: [],
        samples: [],
        active: false,
        loggedIn: false,
        session: null,
        loginString: 'user01',
        loginErrorMessage: '',
        hasLoginErrorMessage: false,
        feedback: ''
    };        
    
    var model = {
        text: '',
        active: false,
        data: {},
        dataset: [],
        samples: [],
        active: false,
        loggedIn: false,
        session: null,
        loginString: 'user01',
        loginErrorMessage: '',
        hasLoginErrorMessage: false,
        feedback: ''
    };        
         
    var keyPress = function(event) {
        if (model.active == true) {
            event.preventDefault();
        } else {
            model.active = true;             
        }
    };
    
    var keyDown = function(event) {
        if (!model.active) {
            model.data.key = event.keyCode;
            model.data.pressTime = (new Date()).getTime();             
        }
        console.log(model);
    };
    
    var keyUp = function(event) {
        if (model.active) {                  
            model.data.releaseTime = (new Date()).getTime();             
            model.data.dwellTime = model.data.releaseTime - model.data.pressTime;
            model.feedback += JSON.stringify(model.data) + "\n";
            model.data = {};
            model.active = false;
        }
    };
    
    var resetText = function() {
        console.log('q');
        model.text = '';
        model.feedback = '';
        model.dataset = [];
    }; 
    
    var sessionActive = function() {
        return model.loggedIn;
    };
    
    var logIn = function() {
        var userid = model.loginString;
    
        if (!system.userExists(userid)) {
            model.hasLoginErrorMessage = true;
            model.loginErrorMessage = 'Invalid User';
            return;
        }
        
        system.setUser(model.loginString);
        model.loggedIn = true;         
        model.session = {
            user_id: system.whoAmI(),
            user_group: system.myGroup(),                          
            knownFiles: Array.from(system.listFiles().values()),
            selectedFile: null,
            permissions: {
                read: false,
                write: false,
                execute: false
            }
        };
    };
    
    var logOut = function() {
        for (var key in defaultModel) {
            model[key] = defaultModel[key];
        }
    };
    
    var refresh = function() {
        model.session.selectedFile = null;
        model.session.knownFiles = Array.from(system.listFiles().values());
        model.session.permissions.read = false;
        model.session.permissions.write = false;
        model.session.permissions.execute = false;
    };
    
    var validate = function() {
        if (system.userExists(model.loginString)) {
            return true;
        } else {
            return false;
        }
    };
    
    var test = function() {
        var fileName = model.session.selectedFile;
        var p = model.session.permissions;
        console.log(p);
        var permissions = Object.keys(p).map((permission) => {
            if (p[permission] == true) {
                return permission;
            }
        }).filter((x) => {
            return (x != null);
        }); 

        console.log(permissions);        
        
        var result = system.test({
            fileName: fileName, 
            permissions: new Set(permissions)
        });
        alert(result.message);
    };

    app.controller('systemCtrl', ['$scope', ($scope) => {
        $scope.model = model;
        $scope.active = false;
        
        $scope.sessionActive = sessionActive;
        $scope.logIn = logIn;
        $scope.logOut = logOut;
        $scope.refresh = refresh;
        $scope.test = test;
        $scope.keyPress = keyPress;         
        $scope.keyDown = keyDown;
        $scope.keyUp = keyUp;         
        $scope.resetText = resetText;
        $scope.validate = validate;
    }]);
})();