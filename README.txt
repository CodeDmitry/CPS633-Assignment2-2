
SUMMARY:
   part2.rar: a NodeJS console application demonstration the formula, FRR, FAR, and EER.
   index.html: an offline web application demonstrating RBAC; it has some interesting work regarding part2 but these parts 
        are merely there as a proof of concept.
   

files:
    part2.rar: a NodeJS console application demonstrating the formula, FRR, FAR, and EER.
    index.html: the standalone html webpage that hosts our modules.
    deps: various cross platform css/javascript framework dependencies.
    app.js: here is where our app's module is defined.
    scripts:
        biometrics.js: here is where we handle biometric services
            (we gavecompletely integrating it, and wrote another solution in part2.rar which contains a nodejs program for solving that).
        enrollCtrl.js: here is where we handle enroll view controllers.
        enrollFeedbackDirective.js: here is where we define our enroll
            view's realtime key responsiveness.
        homeCtrl.js: here is where we handle stuff going on in the 
            home view.
        contentCtrl.js: manages which page is currently active.
        system.js: here is where we store "RBAC" related model and session state, exposed to the system under window.core.
        systemCtrl.js: here is where we handle stuff going on in the system
            view.
        changeUserGroupCtrl.js: uses exposed system core to modify a group of a user.
        modifyAclCtrl.js: uses exposed system core to modify the ACL.
            
    styles: style.css: single custom style 

details:
    index.html is a standalone webpage designed to be runnable on modern
        browsers out of the zip archive. The dependencies use relative paths
        and the project should be runnable by simply opening index.html in
        browser from the filesystem without a server running.

    the program has four views:
        home view
        enrollment view
        system view
        control view

    the home view has a console that helps interact with the 
        system module without opening browser console or having
        access to a console on mobile.
        
    the enrollment has a user id field that captures keystrokes at
        realtime and when submitted, it will print out JSON format
        of the keystrokes in the home console, and send a message to
        the system to register the user. The user can in fact now be
        accessed via the System view.
        
    the system view lets you interact with the system in the expected RBAC way.
    
    the control view lets you change group of a user, or permissions the user has to a specific file.
        
    the system supports three roles, which are case sensitive:
        Sales
        Manager
        Technical Staff
        
    the system will reject any attempt to create a manager as user01
        has been designated to be the Manager. This is hardcoded into
        system.js which is easy to change.
    
    the System view has a login page which was originally meant to 
        accept multiple keystroke samples of the same user id, and
        use the formula to check if access is allowed or not; but 
        due to time constraints this could not be implemented.
        
    The system recognizes groups and will put the user's group next
        to their name in the greeting message to show this.
        
    The system meets all the access control criteria via system.test
        function exported by system.js. The permissions are set to
        exact permissions written in the assignment description.
        
    The system does in fact store the user id, the requested group id,
        and even the keystroke sequence when they register, this information is exposed via "window.core" object;
        
        in the console, type: 
            JSON.stringify(window.core.enrollmentData, null, 4)
        
        to check that this is the case.
        
        Keep in mind that the actual solution to Part 2 is a NodeJS program in part2.rar.

        (side-comment) integrating it into
            the webpage isn't hard, but gathering the 5 samples to compare against isn't too hard, but we
            misunderstood the idea. We didn't need to gather only the user id, but rather any number of
            arbitrary chracters. It is nice to have a visualization of this, but at the same time, to do this
            correctly, we would need to add a textarea to enrollment and let the user type a sample, and 
            record this sample, rather than the user id in the keystroke form.
    
    The system does report the permissions the user has if the user
        lacks permissions, as well as reports that there is no 
        permissions if the user has no permissions, or if the user
        does not exist.
        
    
        
    
    
    
       
    
        
        
        
        
    