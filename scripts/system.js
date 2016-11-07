(function() {
    'use strict';

    var model = {
        currentUser: 'user01',
        currentUserGroup: 'Manager'
    };
    
    var system = (function() {  
        var core = {
            'userList': null,
            'enrollmentData': null,
            'userGroups': null,
            'userGroupMap': null,
            'fileList': null,
            'accessControlList': null,
            'setPermissions': null,
            'setGroup': null,
            'exports': null
        };
        
        var model = {
            'manager': 'user01'
        };
        
        /* expose all system core to console */
        window.core = core;        
          
        var userList = new Set ([
            'user01',
            'user02',
            'user03',
            'user04',
            'user05'
        ]);
        
        var enrollmentData = {
            'user01': [{"key1":85,"key2":83,"dwell1":79,"dwell2":56,"flyTime":9},{"key1":83,"key2":69,"dwell1":56,"dwell2":62,"flyTime":108},{"key1":69,"key2":82,"dwell1":62,"dwell2":66,"flyTime":83},{"key1":82,"key2":48,"dwell1":66,"dwell2":87,"flyTime":16},{"key1":48,"key2":49,"dwell1":87,"dwell2":83,"flyTime":10}],
            'user02': [{"key1":85,"key2":83,"dwell1":86,"dwell2":103,"flyTime":91},{"key1":83,"key2":69,"dwell1":103,"dwell2":83,"flyTime":119},{"key1":69,"key2":82,"dwell1":83,"dwell2":114,"flyTime":86},{"key1":82,"key2":48,"dwell1":114,"dwell2":103,"flyTime":40},{"key1":48,"key2":50,"dwell1":103,"dwell2":80,"flyTime":40}],
            'user03': [{"key1":85,"key2":83,"dwell1":92,"dwell2":76,"flyTime":47},{"key1":83,"key2":69,"dwell1":76,"dwell2":68,"flyTime":106},{"key1":69,"key2":82,"dwell1":68,"dwell2":93,"flyTime":99},{"key1":82,"key2":48,"dwell1":93,"dwell2":82,"flyTime":89},{"key1":48,"key2":51,"dwell1":82,"dwell2":114,"flyTime":72}],
            'user04': [{"key1":85,"key2":83,"dwell1":99,"dwell2":67,"flyTime":72},{"key1":83,"key2":69,"dwell1":67,"dwell2":66,"flyTime":101},{"key1":69,"key2":82,"dwell1":66,"dwell2":78,"flyTime":93},{"key1":82,"key2":48,"dwell1":78,"dwell2":74,"flyTime":11},{"key1":48,"key2":52,"dwell1":74,"dwell2":75,"flyTime":255}],
            'user05': [{"key1":85,"key2":83,"dwell1":91,"dwell2":75,"flyTime":26},{"key1":83,"key2":69,"dwell1":75,"dwell2":80,"flyTime":133},{"key1":69,"key2":82,"dwell1":80,"dwell2":95,"flyTime":97},{"key1":82,"key2":48,"dwell1":95,"dwell2":61,"flyTime":238},{"key1":48,"key2":52,"dwell1":61,"dwell2":71,"flyTime":84}]
        }
        
        var userGroups = new Set ([
            'Sales',
            'Technical Staff',
            'Manager'
        ]);
        
        var userGroupMap = {
            'user01': 'Manager',
            'user02': 'Sales',
            'user03': 'Technical Staff',
            'user04': 'Technical Staff',
            'user05': 'Technical Staff'            
        };
        
        var fileList = new Set ([
            'user01.txt',
            'user02.txt',
            'user03.txt',
            'user04.txt',
            'user05.txt'
        ]);
        
        /**
         * I contain the exceptional permissions of each user
         *     for specifically named files.
         */
        var accessControlList = {
            'user01': {
                'user01.txt': new Set (['read', 'write', 'execute']),
                'user02.txt': new Set (['read', 'write', 'execute']),
                'user03.txt': new Set (['read', 'write', 'execute']),
                'user04.txt': new Set (['read', 'write', 'execute']),
                'user05.txt': new Set (['read', 'write', 'execute']),
                'user06.txt': new Set (['read', 'write', 'execute'])
            },
            'user02': {
                'user01.txt': new Set (['read', 'write']),
                'user03.txt': new Set (['read', 'execute']),
                'user05.txt': new Set (['read'])
            },
            'user03': {
                'user03.txt': new Set (['read', 'write']),
                'user04.txt': new Set (['read', 'write'])
            },
            'user04': {
                'user01.txt': new Set (['read', 'execute']),
                'user04.txt': new Set (['read']),
                'user05.txt': new Set (['read'])
            },
            'user05': {
                'user02.txt': new Set (['read', 'write', 'execute']),
                'user03.txt': new Set (['read']),
                'user06.txt': new Set (['read'])
            }
        };
        
        var exports = {
            'ls': null,
            'test': null,
            'groupOf': null,
            'userExists': null,
            'registerUser': null
        };
        
        /** 
         * returns a list of all files by value.
         */
        exports.ls = () => {
            var fileListCopy = new Set(Array.from(fileList.values()));
            
            return fileListCopy;
        };
        
        exports.registerUser = (user_id, group_id, digraphs) => {
            if (!userGroups.has(group_id)) {
                group_id = null;                
            } else if (group_id == 'Manager') {
                if (model.manager != null) {
                    return 'system> ' + user + ' is already a Manager, can only have one Manager.';                    
                }
            }
            
            if (userList.has(user_id)) {
                return 'system> this user already exists!';
            } else {
                // manager resigned, free slot.
                if (userGroupMap[user_id] == 'Manager' && group_id != 'Manager') {
                    alert('warning: changing manager!');
                    model.manager = null;
                }
            
                userList.add(user_id);
                userGroupMap[user_id] = group_id;
                accessControlList[user_id] = {};
                enrollmentData[user_id] = digraphs;
                
                if (group_id == 'Manager') {
                    model.manager = user_id;
                }
            
                return 'system> success!'
            }        
        };
        
        exports.userExists = (user_id) => {
            return userList.has(user_id);
        };
        
        exports.groupOf = function(user_id) {
            if (user_id in userGroupMap) {
                return userGroupMap[user_id];
            } else {
                return null;
            }
        };
        
        exports.test = (user_id, fileName, requestSet) => {
            var permissions = accessControlList[user_id][fileName];
            console.log('testing: ' + fileName + '.');
            console.log(accessControlList[user_id]);
            
            if (permissions == null) {
               return {
                    status: false,
                    permissions: permissions,
                    message: 'no such file.'
                }                
            }
            
            /* make into copy */            
            permissions = new Set(Array.from(permissions.values()));
            console.log(permissions);
        
            console.log(requestSet);
            for (var request of requestSet) {
                console.log('checking ' + request);
                if (!permissions.has(request)) {
                    return {
                        status: false,
                        permissions: permissions
                    }
                } else {
                    return {
                        status: true,
                        permissions: permissions
                    }
                }
            }
        };
        
        var setPermissions = function(user_id, fileName, permissions) {        
            var response = {
                'status': null,
                'message': null
            };
                    
            if (!userList.has(user_id)) {
                response.status = false;
                response.message = 'no user has user_id: ' + user_id + '.';
            } else if (!fileList.has(fileName)) {
                response.status = false;
                response.message = 'no such file: ' + fileName + '.';
            } else {
                if (!user_id in accessControlList) {
                    accessControlList[user_id] = {};
                }
                
                var row = accessControlList[user_id];

                row[fileName] = permissions;
                
                response.status = true;
                response.message = 'success!';
            }
         
            return response;   
        };
        
        var setGroup = function(user_id, group) {
            var response = {
                'status': false,
                'message': null
            };
            
            if (group === 'Manager' && model.manager != null) {
                response.status = false;
                response.message = 'System already has manager: ' + model.manager;
            } else if (group != 'Manager' && model.manager == user_id) {
                // resigning manager                
                model.manager = null;
                userGroupMap[user_id] = group;
                response.status = true;
                response.message = 'You have resigned as a Manager.';
            } else if (!userList.has(user_id)) {
                response.message = 'no user has user_id: ' + user_id + '.';
            } else if (!userGroups.has(group)) {
                response.message = 'no such group: ' + group;
            } else {
                userGroupMap[user_id] = group;
                response.status = true;
                response.message = 'success: user ' + user_id + ' now belongs to group: ' + group + '.';
            }
            
            return response;
        };

        core.userList = userList;
        core.enrollmentData = enrollmentData;
        core.userGroups = userGroups;
        core.userGroupMap = userGroupMap;
        core.fileList = fileList;
        core.accessControlList = accessControlList;
        core.setPermissions = setPermissions;
        core.setGroup = setGroup;
        core.exports = exports;
                        
        return exports;
    })();
    
    var exports = {
        'whoAmI': null,
        'listFiles': null,
        'test': null,
        'setUser': null,
        'userExists': null,
        'registerUser': null
    };
    
    exports.setUser = (user_id) => {
        model.currentUser = user_id;
        model.currentUserGroup = system.groupOf(user_id);
    }
    
    exports.registerUser = (user_id, group_id, digraphs) => {
        console.log('system: ' + user_id, group_id, digraphs.length);
        alert(system.registerUser(user_id, group_id, digraphs));
    };
    
    exports.userExists = (user_id) => {
        return system.userExists(user_id);
    };
    
    exports.whoAmI = () => model.currentUser;
    exports.myGroup = () => model.currentUserGroup;
    
    exports.listFiles = system.ls;      

    exports.test = (options) => {
        var fileName = options.fileName;
        var permissions = options.permissions;
        console.log(options);
        if (options.fileName == null) {
            return {
                status: false,
                data: null,
                message: 'No fileName specified.'
            }
        }
        
        var result = system.test(model.currentUser, fileName, permissions);
        if (result == null) {
            return {
                status: false,
                message: 'something went wrong.',
                data: result
            };
        }
        if (!result.permissions) {
            return {
                status: false,
                message: 'You do not have any permissions for ' + fileName + '.',
                data: result
            }
        }
        
        if (!result.status) {
            return {
                status: false,
                message: 'You only have permissions to ' + Array.from(result.permissions.values()).toString() + '.',
                data: result
            };
        } else {
            return {
                status: true,
                message: 'Access granted!',
                data: result
            }
        }
    };  
    
    window.system = exports;
    
    return exports;
})();