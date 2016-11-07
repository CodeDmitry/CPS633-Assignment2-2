(function() {     
     'use strict';
     
     var app = angular.module('app');
     
     var model = {
         text: '',
         active: false,
         data: {},
         active: false,
         feedback: '',
         dataset: [],
         groupName: 'Sales'       
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
     };
     
     var keyUp = function(event) {
         if (model.active) {                  
             model.data.releaseTime = (new Date()).getTime();             
             model.data.dwellTime = model.data.releaseTime - model.data.pressTime;
             model.feedback = JSON.stringify(model.data) + "\n" + model.feedback;             
             model.dataset = model.dataset.concat(model.data);
             model.data = {};
             model.active = false;
         }
     };
     
     var resetText = function() {
         model.text = '';
         model.feedback = '';
         model.dataset = [];
     }; 
     
     var enroll = function() {
         var dataset = model.dataset;
         var user_id = model.text;
         var group_id = model.groupName;
         
         var digraphs = biometrics.digraphs_from_monographs(dataset);
         system.registerUser(user_id, group_id, digraphs);
         $('#homeFeedback').text(JSON.stringify(digraphs, null, 4) + "\n" + $('#homeFeedback').text());
         resetText();
     };

     app.controller('enrollCtrl', ['$scope', ($scope) => {
         $scope.model = model;
         $scope.active = false;

         $scope.keyPress = keyPress;         
         $scope.keyDown = keyDown;
         $scope.keyUp = keyUp;         
         $scope.resetText = resetText;
         $scope.enroll = enroll;
     }]);
})();