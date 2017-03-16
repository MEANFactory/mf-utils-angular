/* jshint -W101 */
/* jshint -W072 */

(function(){

    'use strict';

    angular
        .module('mf-utils-angular')
        .factory('mfCommon', mfCommon);

    mfCommon.$inject = ['$auth', '$http', '$location', '$q', '$rootScope', '$state', '$stateParams', '$timeout', 'exception', 'logger', 'APP_INFO'];
    function mfCommon ($auth, $http, $location, $q, $rootScope, $state, $stateParams, $timeout, exception, logger, APP_INFO) {

        return {

            // Angular native
            $auth           : $auth,
            $http           : $http,
            $location       : $location,
            $q              : $q,
            $rootScope      : $rootScope,
            $state          : $state,
            $stateParams    : $stateParams,
            $timeout        : $timeout,

            // Reusable components
            exception       : exception,
            e               : exception,
            logger          : logger,
            l               : logger,

            // Constants
            APP_INFO        : APP_INFO,
            appInfo         : {
                get defaults () {
                    var d = (APP_INFO || {}).defaults || {};
                    return {
                        brandKey  : (d.brandKey || '').trim().toLowerCase(),
                        prodKey   : (d.prodKey || '').trim().toLowerCase(),
                        appKey    : (d.appKey || '').trim().toLowerCase(),
                        verKey    : (d.verKey || '').trim().toLowerCase(),
                        stateName : (d.stateName || '').trim().toLowerCase(),

                        requireLogin    : (d.requireLogin === true || d.requireLogin === false) ? d.requireLogin : true,
                        requireAccount  : (d.requireAccount === true || d.requireAccount === false) ? d.requireAccount : true
                    };
                },
                get constants () {
                    var c = (APP_INFO || {}).constants || {};
                    return {
                        brandKey : (c.brandKey || '').trim().toLowerCase(),
                        prodKey  : (c.prodKey || '').trim().toLowerCase(),
                        appKey   : (c.appKey || '').trim().toLowerCase(),
                        verKey   : (c.verKey || '').trim().toLowerCase()
                    };
                }
            },

            // Utilities
            broadcast       : broadcast,
            params : {
                get xfer () {
                    var p = ($stateParams || {});
                    return {
                        source : {
                            brandKey  : (p.sb || '').trim().toLowerCase(),
                            prodKey   : (p.sp || '').trim().toLowerCase(),
                            appKey    : (p.sa || '').trim().toLowerCase(),
                            verKey    : (p.sv || '').trim().toLowerCase(),
                            stateName : (p.ss || '').trim().toLowerCase()
                        },
                        target : {
                            brandKey  : (p.tb || '').trim().toLowerCase(),
                            prodKey   : (p.tp || '').trim().toLowerCase(),
                            appKey    : (p.ta || '').trim().toLowerCase(),
                            verKey    : (p.tv || '').trim().toLowerCase(),
                            stateName : (p.ts || '').trim().toLowerCase()
                        },
                        token     : (p.jwt || '').trim()
                    };
                }
            }
        };

        function broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }
    }
})();
