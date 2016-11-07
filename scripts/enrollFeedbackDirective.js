/**
 * enroll-feedback directive definition:
 *     "Here is where we construct the keystroke feedback in the enrollment section."
 */
(function() {
    'use strict';
             
    var app = angular.module('app');
    
    var link = function(scope, element, attrs) {
        element = element[0];
        
        element.style.position = 'absolute';
        element.style.bottom = '0px';
        element.style.left = '0px';
        element.style.height = '125px';
        element.style.width = '100%';
    };
    
    app.directive('enrollFeedback', function() {          
        return {
            link: link
        };
    });
})();