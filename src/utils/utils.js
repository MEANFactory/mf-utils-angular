/* jshint -W101 */
/* jshint -W072 */

(function(){

    'use strict';

    angular
        .module('mf-utils-angular.utils')
        .factory('mfUtils', mfUtils);

    mfUtils.$inject = ['arrayUtils', 'boolUtils', 'cacheUtils', 'constants', 'cryptoUtils', 'dateUtils', 'emailUtils', 'errorUtils', 'ioUtils', 'jwtUtils', 'modelUtils', 'numberUtils', 'objectUtils', 'schemaUtils', 'sessionUtils', 'stringUtils', 'uuidUtils'];
    function mfUtils (arrayUtils, boolUtils, cacheUtils, constants, cryptoUtils, dateUtils, emailUtils, errorUtils, ioUtils, jwtUtils, modelUtils, numberUtils, objectUtils, schemaUtils, sessionUtils, stringUtils, uuidUtils) {

        return {
            arrays      : arrayUtils,
            booleans    : boolUtils,
            cache       : cacheUtils,
            constants   : constants,
            crypto      : cryptoUtils,
            dates       : dateUtils,
            email       : emailUtils,
            errors      : errorUtils,
            io          : ioUtils,
            jwt         : jwtUtils,
            models      : modelUtils,
            numbers     : numberUtils,
            objects     : objectUtils,
            schemas     : schemaUtils,
            session     : sessionUtils,
            strings     : stringUtils,
            uuids       : uuidUtils
        };
    }

})();
