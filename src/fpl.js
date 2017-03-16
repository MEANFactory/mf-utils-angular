(function(){

    'use strict';

    angular
        .module('mf-utils-angular')
        .factory('mf', mf);

    mf.$inject = ['mfCommon', 'mfUtils'];
    function mf (mfCommon, mfUtils) {

        return {

            common  : mfCommon,
            c       : mfCommon,
            utils   : mfUtils,
            u       : mfUtils

        };

    }
})();
