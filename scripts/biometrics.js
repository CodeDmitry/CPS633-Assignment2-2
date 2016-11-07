(function() {
    'use strict';
    
    var exports = {
        'digraphs_from_monographs': null,
        'monographs_from_digraphs': null,
        'computeDeviation': null
    };

    exports.digraphs_from_monographs = (monographs) => {
        let digraphs = [];
        
        for (let i = 0; i < (monographs.length - 1); ++i) {
            const monograph1 = monographs[i];
            const monograph2 = monographs[i + 1];
        
            const digraph = {
                key1: monograph1.key,
                key2: monograph2.key,
                dwell1: monograph1.dwellTime,
                dwell2: monograph2.dwellTime,
                flyTime: (monograph2.pressTime - monograph1.releaseTime)
            };
            
            digraphs.push(digraph);
        }
        
        return digraphs;
    };
    
    /**
     * recovers key, dwellTime pairs from digraphs.
     */
    exports.monographs_from_digraphs = (digraphs) => {
        const monographs = digraphs.map((digraph) => {
            return [
                {key: digraph.key1, dwellTime: digraph.dwell1},
                {key: digraph.key2, dwellTime: digraph.dwell2}                
            ];
        }).reduce((prev, cur) => {
            return prev.concat(cur);
        }, []);
        
        return monographs;
    };
    
    /**
     * takes an array of enrollment digraphs and an array of sample digraphs.
     * returns 1.0 if the two digraphs match, 0.0 if they do not.
     * - monitored, and referenced
     */
    exports.computeDeviation = (ref_digraphs, mon_digraphs) => {
        var all_match = true;
        try { 
            ref_digraphs.map((x, index) => {
                if ((x.key1 != mon_digraphs[index].key1) || (x.key2 != mon_digraphs[index].key2)) {
                    all_match = false;
                    console.log('mismatch');
                }
            });
        } catch (e) {
            all_match = false;
            console.log('exception: ' + e);
        }
        
        if (all_match) {
            return 1.0;
        } else {
            return 0.0;
        }
    };
    
    window.biometrics = exports;
    return exports
})();
