/* jshint -W101 */
/* jshint -W072 */

(function(){

    'use strict';

    angular.module('mf-utils-angular', [
        'mf-utils-angular.blocks',
        'mf-utils-angular.utils',

        'ui.router'
    ]);

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular.blocks', [
        'mf-utils-angular.blocks.exception',
        'mf-utils-angular.blocks.logger'
    ]);

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular.utils', [
        'angular-cache',
        'angular-jwt',
        'satellizer'
    ]);

})();

(function() {
    'use strict';

    angular.module('mf-utils-angular.blocks.exception', [

        'mf-utils-angular.blocks.logger'

    ]);
})();

(function() {

    'use strict';

    angular
        .module('mf-utils-angular.blocks.logger', [

        ]);

})();

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

/**
 * Created by MEAN Factory on 7/10/16.
 */

(function () {

    'use strict';

    angular
        .module('mf-utils-angular.utils')
        .constant('moment', window.moment)
        .run(function($rootScope, $state){
            $rootScope.moment = window.moment;
            $rootScope.$state = $state;
        });

})();

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

// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function() {
    'use strict';

    angular
        .module('mf-utils-angular.blocks.exception')
        .provider('exceptionHandler', exceptionHandlerProvider)
        .config(config);

    /**
     * Must configure the exception handling
     * @return {[type]}
     */
    function exceptionHandlerProvider() {
        /* jshint validthis:true */
        this.config = {
            appErrorPrefix: undefined
        };

        this.configure = function (appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };

        this.$get = function() {
            return {config: this.config};
        };
    }

    /**
     * Configure by setting an optional string value for appErrorPrefix.
     * Accessible via config.appErrorPrefix (via config value).
     * @param  {[type]} $provide
     * @return {[type]}
     * @ngInject
     */
    function config($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    /**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} exceptionHandler
     * @param  {Object} logger
     * @return {Function} the decorated $exceptionHandler service
     */
    function extendExceptionHandler($delegate, exceptionHandler, logger) {
        return function(exception, cause) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
            var errorData = {exception: exception, cause: cause};
            exception.message = appErrorPrefix + exception.message;
            $delegate(exception, cause);
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            logger.error(exception.message, errorData);
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('mf-utils-angular.blocks.exception')
        .factory('exception', exception);

    exception.$inject = ['logger'];
    function exception(logger) {
        var service = {
            catcher: catcher,
            apiErrorHandler: logger.apiErrorHandler
        };
        return service;

        function catcher(message) {
            return function(reason) {
                logger.error(message, reason);
            };
        }

        // function apiErrorHandler(err, title) {
        //     err = err || 'An API error has occurred.';
        //     var msg = (err.data) ? (err.data.message || err.data) : (err.message || err);
        //     logger.error(msg, err, title);
        // }
    }
})();

/**
 * Created by MEAN Factory on 7/10/16.
 */

(function () {

    'use strict';

    angular
        .module('mf-utils-angular.blocks.logger')
        .constant('toastr', window.toastr)
        .run(function($rootScope, $state){
            $rootScope.$state = $state;
        });

})();

(function() {
    'use strict';

    angular
        .module('mf-utils-angular.blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr', 'APP_INFO'];
    function logger($log, toastr, APP_INFO) {

        return {
            showToasts: true,

            error           : error,
            info            : info,
            success         : success,
            warning         : warning,
            apiErrorHandler : apiErrorHandler,

            // straight to console; bypass toastr
            log     : $log.log
        };

        /////////////////////

        function prefix () {
            return (APP_INFO && APP_INFO.name) ? (APP_INFO.name + ' ') : '';
        }

        function error(message, data, title) {
            toastr.error(message, title);
            $log.error(prefix() + 'Error: ' + message, data);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info(prefix() + 'Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.info(prefix() + 'Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn(prefix() + 'Warning: ' + message, data);
        }

        function apiErrorHandler(err, title) {
            /* jshint -W074 */
            err = err || {};
            var data = err.data || {};
            var msg = err.message || data.message || (typeof err === 'string' ? err : 'Unknown error.');
            title = title || err.statusText || data.title || err.status || '';
            error(msg, err, title);
        }
    }
}());

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('arrayUtils', arrayUtils);

    arrayUtils.$inject = [];
    function arrayUtils () {

        return {
            count       : count,
            first       : first,
            isArray     : isArray,
            isEmpty     : isEmpty,
            isValid     : isValid,
            last        : last,
            merge       : merge,
            safeCount   : safeCount,
            single      : single,
        };

        function isArray (value) {
            return ((typeof value === 'object') && (value instanceof Array));
        }

        function count (items) {
            return isArray(items) ? items.length : -1;
        }

        function safeCount (items) {
            return count([].concat(items));
        }

        function isEmpty (items) {
            return (count(items) < 1);
        }

        function last (items) {
            return isEmpty(items) ? undefined : items[items.length - 1];
        }

        function single (items) {
            return count(items) === 1 ? items[0] : undefined;
        }

        function first (items) {
            return count(items) > 0 ? items[0] : undefined;
        }

        function isValid (items, emptyOkay) {
            return emptyOkay ? isArray(items) : !isEmpty(items);
        }

        function merge (target, source) {

            target = target || [];

            [].concat(source).filter(function(item){
                return (item !== 'undefined');
            }).forEach(function(item){
                if (target.indexOf(item) < 0) {
                    target.push(item);
                }
            });

            return target;
        }
    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('boolUtils', boolUtils);

    boolUtils.$inject = [];
    function boolUtils () {

        return {
            isValid     : isValid,
            ifValid     : ifValid,
            toBoolean   : toBoolean
        };

        function isValid (value, strict) {
            if (typeof strict === 'undefined') { strict = true; }
            if (strict) {
                return (value === true || value === false);
            } else if (typeof value === 'string') {
                return (['true', 'false', '1', '0', 'on', 'off', 'yes', 'no'].indexOf(value.toLowerCase()) >= 0);
            } else if (typeof value === 'number') {
                return ([1, 0, -1].indexOf(value) >= 0);
            } else {
                return !!value;
            }
        }

        function toBoolean (value, strict) {
            if (!isValid(value, strict)) { return undefined; }
            if (strict) {
                return value;
            } else if (typeof value === 'string' &&
                ['true', '1', '-1', 'on', 'yes'].indexOf(value.toLowerCase()) >= 0) {
                return true;
            } else if (typeof value === 'string' &&
                ['false', '0', 'off', 'no'].indexOf(value.toLowerCase()) >= 0) {
                return false;
            } else if (typeof value === 'number' && value === 0) {
                return false;
            } else if (typeof value === 'number' && (value === 1 || value === -1)) {
                return true;
            } else {
                return !!value;
            }
        }

        function ifValid (value, strict, defaultValue) {
            var _strict;
            var _default;
            if (typeof defaultValue === 'undefined') {
                _default = strict;
            } else {
                _strict = strict;
                _default = defaultValue;
            }
            return isValid(value, _strict) ? value : _default;
        }

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('cacheUtils', cacheUtils);

    cacheUtils.$inject = ['sessionUtils', 'CacheFactory', 'APP_INFO'];
    function cacheUtils (session, CacheFactory, APP_INFO) {

        return {
            getCache            : getCache,
            getObjectCache      : getObjectCache,
        };

        // ----------

        function getCache (cacheName, options) {

           var cache = CacheFactory.get(cacheName);
           if (cache) { return cache; }

           options = options || {};
           options.maxAge = options.maxAge || APP_INFO.caching.options.maxAge || (60 * 60 * 1000);    // One hour
           options.deleteOnExpire = options.deleteOnExpire || APP_INFO.caching.options.deleteOnExpire || 'passive';
           options.storageMode = options.storageMode || APP_INFO.caching.options.storageMode || 'localStorage';
           options.storagePrefix = options.storagePrefix || APP_INFO.caching.options.storagePrefix || 'common.caches';

           cache = CacheFactory.createCache(cacheName, options);
           return cache;
        }

        function getObjectCache (typeName, options) {
            if (!options && (typeof typeName === 'object')) {
                options = typeName;
                typeName = '';
            }
            typeName = ((typeName || '').trim()) || 'objects';
            var cacheName = session.fullUserId + '-' + typeName;
            return getCache(cacheName, options);
        }

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('constants', constants);

    constants.$inject = [];
    function constants () {

        var levels = {
          NONE  : { value: 0,  name: 'None' },
          GUEST : { value: 10, name: 'Guest' },
          USER  : { value: 20, name: 'User' },
          ADMIN : { value: 30, name: 'Admin' },
          OWNER : { value: 40, name: 'Owner' },
          SYSTEM: { value: 50, name: 'System' }
        };

        var rules = {};
        var ops = [
          { key: 'LESS_THAN', alt: 'LT', text: '<' },
          { key: 'GREATER_THAN', alt: 'GT', text: '>' },
          { key: 'LESS_THAN_OR_EQUALS', alt: 'LTE', text: '<=' },
          { key: 'GREATER_THAN_OR_EQUALS', alt: 'GTE', text: '>=' },
          { key: 'EQUALS', alt: 'EQ', text: '>=' },
        ];
        Object.keys(levels).forEach(function(levelKey){
          var level = levels[levelKey];
          ops.forEach(function(op){
            rules[op.key + '_' + levelKey] = op.text + ' ' + level.value;
            rules[op.alt + '_' + levelKey] = op.text + ' ' + level.value;
          });
        });

        var httpStatusCodes = {
            response: {
                INFO: 100,
                SWITCHING_PROTOCOLS: 101
            },
            success: {
                OK: 200,
                CREATED: 201,
                ACCEPTED: 202,
                NON_AUTHORITIVE_INFORMATION: 203,
                NO_CONTENT: 204,
                RESET_CONTENT: 205,
                PARTIAL_CONTENT: 206
            },
            redirected: {
                MULTIPLE_CHOICES: 300,
                MOVED_PERMANENTLY: 301,
                MOVED_TEMPORARILY: 302,
                SEE_OTHER: 303,
                NOT_MODIFIED: 304,
                USE_PROXY: 305,
                TEMPORARY_REDIRECT: 307
            },
            incomplete: {
                BAD_REQUEST: 400,
                UNAUTHORIZED: 401,
                PAYMENT_REQUIRED: 402,
                FORBIDDEN: 403,
                NOT_FOUND: 404,
                METHOD_NOT_ALLOWED: 405,
                NOT_ACCEPTABLE: 406,
                PROXY_AUTHENTICATION_REQUIRED: 407,
                REQUEST_TIMEOUT: 408,
                CONFLICT: 409,
                GONE: 410,
                LENGTH_REQUIRED: 411,
                PRECONDITION_FAILED: 412,
                REQUEST_ENTITY_TOO_LARGE: 413,
                REQUEST_URI_TOO_LONG: 414,
                UNSUPPORTED_MEDIA_TYPE: 415,
                EXCEPTION_FAILED: 417
            },
            errors: {
                INTERNAL_SERVER_ERROR: 500,
                NOT_IMPLEMENTED: 501,
                BAD_GATEWAY: 502,
                SERVICE_UNAVAILABLE: 503,
                GATEWAY_TIMEOUT: 504,
                HTTP_VERSION_NOT_SUPPORTED: 505
            }
        };

        return {
          http: {
              status: httpStatusCodes
          },
          plugins: {
            mf: {
              dto: {
                levels: levels,
                rules : rules
              }
            }
          }
        };

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('cryptoUtils', cryptoUtils);

    cryptoUtils.$inject = [];
    function cryptoUtils () {

        // var crypto  = require('crypto');
        // var strings = require('./strings');

        var SALT_OPTION = 'base64';
        var HMAC_OPTION = 'sha1';
        var DIGEST_OPTION = 'hex';

        return {
            // createCode  : createCode,
            // createSalt  : createSalt,
            // hash        : hash,
        };

        // function createCode(totalLength, chars) {
        //     chars = chars || strings.ALPHANUMERIC;
        //     var rnd = crypto.randomBytes(totalLength),
        //         value = new Array(totalLength),
        //         len = chars.length;
        //
        //     for (var i = 0; i < totalLength; i+=1) {
        //         value[i] = chars[rnd[i] % len];
        //     }
        //
        //     return value.join('');
        // }

        // function createSalt(byteCount) {
        //     return crypto.randomBytes(byteCount).toString(SALT_OPTION);
        // }

        // function hash(value, salt) {
        //     var hmac = crypto.createHmac(HMAC_OPTION, salt);
        //     return hmac.update(value).digest(DIGEST_OPTION);
        // }

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('dateUtils', dateUtils);

    dateUtils.$inject = ['moment', 'stringUtils', 'numberUtils'];
    function dateUtils (moment, strings, numbers) {

        var minDate = new Date(1900, 1, 1);

        return {

            MIN: minDate,

            add : add,
            subtract : subtract,

            isDate: isDate,
            isDateOrNull: isDateOrNull,
            isUnixDateStamp: isUnixDateStamp,
            isUnixDateStampOrNull: isUnixDateStampOrNull,
            isValidMomentDuration: isValidMomentDuration,

            isValid: isValid,
            isLeapYear: isLeapYear

        };

        function add (value, quantity, duration) {
            return moment(value).add(quantity, duration).toDate();
        }
        function subtract (value, quantity, duration) {
            return moment(value).subtract(quantity, duration).toDate();
        }

        function isDate(value) {
        	return moment(value).isValid();
        }
        function isDateOrNull(value) {
        	return (value === null || isDate(value));
        }

        function isUnixDateStamp(value) {
        	return numbers.isNumber(value) && moment.unix(value).isValid();
        }
        function isUnixDateStampOrNull(value) {
        	return (value == null || isUnixDateStamp(value));
        }

        function isValidMomentDuration(quantity, duration) {
            if (!strings.isValidString(duration) || !numbers.isValid(quantity)) { return false; }
            return (!(moment().add(quantity, duration))) ? true : false;
        }

        function isValid (year, month, day) {
            if (isNaN(year) || isNaN(month) || isNaN(day)) { return false; }
            return moment([year, month, day]).isValid();
        }

        function isLeapYear (year) {
            if (isNaN(year)) { return false; }
            return moment(year, 1, 29).isValid();
        }

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('emailUtils', emailUtils);

    emailUtils.$inject = ['stringUtils'];
    function emailUtils (strings) {

        // var email       = require('email-addresses'),
        //     gravatar    = require('gravatar'),
        //     strings     = require('./strings');

        return {
            // isValid: isValid,
            // isValidText: isValidText,
            // isValidLocalPart: isValidLocalPart,
            // isValidDomainName: isValidDomainName,
            // getLocalPart: getLocalPart,
            // getDomainName: getDomainName,
            // getText: getText,
            //
            // toGravatarUrl: toGravatarUrl
        };

        // function isValid(value) {
        //     if (!strings.isValid(value)) { return false; }
        //     var address;
        //     try { address = email.parseOneAddress(value); }
        //     catch (err) { return false; }
        //     return (address && address.local && address.domain);
        // }
        //
        // function isValidText(value) {
        //     if (!strings.isValid(value)) { return false; }
        //     var address;
        //     try { address = email.parseOneAddress(value); }
        //     catch (err) { return false; }
        //     return (address && (value.toLowerCase() === address.local + '@' + address.domain));
        // }
        //
        // function isValidLocalPart(value) {
        //     if (!strings.isValid(value)) { return false; }
        //     var address;
        //     try { address = email.parseOneAddress(value.toLowerCase() + '@test.com'); }
        //     catch (err) { return false; }
        //     return (address && (value.toLowerCase() === address.local));
        // }
        //
        // function isValidDomainName(value) {
        //     if (!strings.isValid(value)) { return false; }
        //     var address;
        //     try { address = email.parseOneAddress('test@' + value.toLowerCase()); }
        //     catch (err) { return false; }
        //     return (address && (value.toLowerCase() === address.domain));
        // }
        //
        // function getText(address) {
        //     return isValid(address) ? (address.local + '@' + address.domain) : undefined;
        // }
        //
        // function getLocalPart(address) {
        //     return isValid(address) ? address.local : undefined;
        // }
        //
        // function getDomainName(address) {
        //     return isValid(address) ? address.domain : undefined;
        // }
        //
        // function toGravatarUrl(value, options, protocol) {
        //     if (!isValidText(value)) { return null; }
        //     return gravatar.url(value, options, protocol);
        // }

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('errorUtils', errorUtils);

    errorUtils.$inject = [];
    function errorUtils () {

        return {

        };

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('ioUtils', ioUtils);

    ioUtils.$inject = [];
    function ioUtils () {

        return {

        };

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('jwtUtils', jwtUtils);

    jwtUtils.$inject = ['jwtHelper', 'dateUtils', 'stringUtils'];
    function jwtUtils (jwt, dates, strings) {

        return {
            fromPayload : fromPayload,
            fromToken   : fromToken
        };

        function fromPayload (payload) {

            payload = payload || {};

            var data = {
                userId      : strings.ifValid(payload.sub, undefined),
                accountId   : strings.ifValid(payload.aid, undefined),
                sessionId   : strings.ifValid(payload.iss, undefined),
                createdDate : dates.isUnixDateStamp(payload.iat) ? new Date(payload.iat * 1000) : undefined,
                expiryDate  : dates.isUnixDateStamp(payload.exp) ? new Date(payload.exp * 1000) : undefined,
            };

            return data;
        }

        function fromToken (token) {
            try {
                var payload = jwt.decodeToken(token);
                return fromPayload(payload);
            } catch (e) {
                return null;
            }
        }

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('modelUtils', modelUtils);

    modelUtils.$inject = [];
    function modelUtils () {

        return {
        };
    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('numberUtils', numberUtils);

    numberUtils.$inject = ['objectUtils', 'stringUtils'];
    function numberUtils (objects, strings) {

        return {
            getOperationText    : getOperationText,
            isDigits            : strings.isDigits,
            isNumber            : isNumber,
            isSymbol            : isSymbol,
            isValidOperation    : isValidOperation,
            parseOperation      : parseOperation
        };

        function isSymbol (value) {
            if (!strings.isValid(value)) { return false; }
            return (['>', '<', '=', '==', '===', '<=', '>='].indexOf(value) >= 0);
        }
        function isNumber (value) {
            return (!isNaN(parseFloat(value)) && isFinite(value));
        }

        function getOperationText (operation) {
            operation = operation || {};
            switch (operation.operation) {
                case '>':
                    return 'greater than';
                case '>=':
                    return 'greater than or equal to';
                case '<':
                    return 'less than';
                case '<=':
                    return 'less than or equal to';
                case '===':
                    return 'equal to';
                default:
                    return null;
            }
        }

        function parseOperation (value) {

            if (typeof value === 'string') {

                var parts = value.split(' ').filter(function(v){
                    return (isSymbol(v) || strings.isDigits(v));
                });

                if (parts.length === 1 && strings.isDigits(parts[0])) {
                    return {
                        operation   : '===',
                        right       : parseInt(parts[0])
                    };
                }

                if (parts.length === 2 && isSymbol(parts[0]) && strings.isDigits(parts[1])) {
                    return {
                        operation   : parts[0],
                        right       : parseInt(parts[1])
                    };
                }

                if (parts.length === 3 && strings.isDigits(parts[0]) &&
                    isSymbol(parts[1]) && strings.isDigits(parts[2])) {
                    return {
                        left        : parseInt(parts[0]),
                        operation   : parts[1],
                        right       : parseInt(parts[2]),
                    };
                }

                return null;
            }

            if (typeof value === 'number' && isNumber(value)) {
                return {
                    operation   : '===',
                    right       : parseInt(value)
                };
            }

            return null;
        }

        function isValidOperation (value, isLeftRequired) {
            var opr = parseOperation(value);
            if (!opr) { return false; }
            if (isLeftRequired && objects.isUndefined(opr.left)) { return false; }
            return (!objects.isUndefined(opr.operation) && isNumber(opr.right));
        }

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('objectUtils', objectUtils);

    objectUtils.$inject = ['arrayUtils', 'stringUtils'];
    function objectUtils (arrays, strings) {

        return {
            countDefined      : countDefined,
            setValue          : setValue,
            toKey             : toKey,
            toPath            : toPath,
            isDefined         : isDefined,
            ifDefined         : ifDefined,
            isNull            : isNull,
            isValid           : isValid,
            isValidPath       : isValidPath,
            isValidKey        : isValidKey,
            isUndefined       : isUndefined,
            ifUndefined       : ifUndefined,
            getId             : getId,
            getValueFromPath  : getValueFromPath,
            getValue          : getValue,
            getValues         : getValues,
            omit              : omit,
            merge             : merge
        };


        function isDefined (value) {
            return (typeof value !== 'undefined');
        }
        function ifDefined (value, defaultValue) {
            return isDefined(value) ? value : defaultValue;
        }
        function countDefined (values) {
            if (!(values instanceof Array)) { return -1; }
            var count = 0;
            values.forEach(function(value){
               if (isDefined(value)){ count++; }
            });
            return count;
        }




        function isNull (value) {
            return (value === null);
        }





        function isUndefined (value) {
            return (typeof value === 'undefined');
        }
        function ifUndefined (value, defaultValue) {
            return isUndefined(value) ? defaultValue : value;
        }

        function isValidKey (value) {
            value = value || '';
            return (value.trim().length > 0 &&
                strings.isValid(value, strings.ALPHANUMERIC + '_- ', false) &&
                ([' ', '-'].indexOf(value[0]) < 0) &&
                ([' ', '-'].indexOf(value[value.length - 1]) < 0));
        }

        function toKey (value) {
            if (strings.isLowerCase(value)) { return value.trim(); }
            if (strings.isUpperCase(value)) { return value.trim().toLowerCase(); }
            return strings.toCamelCase(value || '');
        }

        function setValue (obj, path, value) {

            var keys, key;

            if (!path || !path.length || Object.prototype.toString.call(path) !== '[object String]') {
                return false;
            }

            if (obj !== Object(obj)) { obj = {}; }

            var delimeter = (path.indexOf('.') < 0 && path.trim().indexOf(' ') > 0) ? ' ' : '.';

            keys = path.split(delimeter);
            while (keys.length > 1) {
                key = toKey(keys.shift());
                if (obj !== Object(obj)) { obj = {}; }
                if (!(key in obj)) {
                    obj[key] = {};
                }
                obj = obj[key];
            }
            obj[toKey(keys[0])] = value;
            return obj;
        }

        function toPath (value) {
            if (typeof value !== 'string') { return null; }
            value = value.trim();
            if (value.length < 1) { return null; }
            var delim = (value.trim().indexOf('.') > 0) ? '.' : ' ';
            var parts = value.split(delim).filter(function(part){
                return isValidKey(part);
            });
            return parts.join('.');
        }
        function isValidPath (value) {
            var path = toPath(value);
            return (path && path.length > 0);
        }

        function getValues (objects, key) {
            var result = [];
            key = key || '';
            if (typeof key !== 'string' || key.length < 1) { return undefined; }
            [].concat(objects).filter(function(o){
                return (typeof o === 'object' &&
                        o != null &&
                        !(o instanceof Array) &&
                        o.hasOwnProperty(key));
            }).forEach(function(o){
                if (result.indexOf(o[key]) < 0) { result.push(o[key]); }
            });
            return result;
        }
        function getValue (obj, key) {
            var values = getValues(obj, key);
            return (arrays.count(values) === 1) ? values[0] : undefined;
        }

        function isValid (obj, strict) {
            if (strict === false) {
                return (typeof obj === 'object');
            } else {
                return (typeof obj === 'object' &&
                        !(obj instanceof Array) &&
                        !(obj instanceof Boolean) &&
                        !(obj instanceof Number) &&
                        !(obj instanceof String));
            }
        }

        function getValueFromPath(obj, path) {

            var parts = (path || '').split('.');
            if (parts.length < 1 || (parts === 1 && parts[0].length < 1)) { return undefined; }

            var current = obj || {};

            for (var i = 0; i < parts.length; i += 1) {
                if (!isValid(current) || !current.hasOwnProperty(parts[i])) {
                    return undefined;
                } else {
                    current = current[parts[i]];
                }
            }
            return current;
        }

        function omit (itemOrArray, fieldOrFields) {

            var items   = [].concat(itemOrArray);
            var fields  = [].concat(fieldOrFields || []);

            for (var i = 0; i < items.length; i += 1) {

                var keys = Object.keys(items[i]) || [];

                for (var k = 0; k < keys.length; k += 1) {

                    var key = keys[k];

                    if (fields.indexOf(k) >= 0) {
                        delete items[i][key];
                    }

                    else if (items[i][key] &&
                        (typeof items[i][key] === 'object') &&
                        (items[i][key] instanceof Array) &&
                        (items[i][key].length > 0) &&
                        items[i][key][0] &&
                        (typeof items[i][key][0] === 'object') &&
                        !(items[i][key][0] instanceof Array)) {
                            omit(items[i][key], fields);
                        }

                }

            }

            return Array.isArray(itemOrArray) ? items : (items.length > 0 ? items[0] : null);
        }

        function merge(target, source) {

            target = target || {};
            source = source || {};

            if (!isValid(target, true) || !isValid(source, true)) {
                return undefined;
            }

            var keys = Object.keys(source);
            for (var k = 0; k < (keys || []).length; k += 1) {

                var key = keys[k];

                if (!isDefined(source[key]) && !isDefined(target[key])) {
                    target[key] = undefined;
                    continue;
                }

                if (!isDefined(source[key])) { continue; }

                if (!isDefined(target[key]) || isNull(target[key])) {
                    target[key] = JSON.parse(JSON.stringify(source[key]));
                    continue;
                }

                if (arrays.isArray(target[key]) && arrays.isArray(source[key])) {
                    target[key] = JSON.parse(JSON.stringify(arrays.merge(target[key], source[key])));
                    continue;
                }

                if (isValid(target[key], true) && isValid(source[key], true)) {
                    target[key] = merge(target[key], source[key]);
                    continue;
                }

                target[key] = target[key] || source[key];
            }

          return target;
        }

        function getId (item) {
            if (isUndefined(item)) { return item; }
            if (isValid(item)) {
                return item['_id'] || item.id;
            }
            return strings.isValid(item) ? item : undefined;
        }

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('schemaUtils', schemaUtils);

    schemaUtils.$inject = ['numberUtils', 'objectUtils'];
    function schemaUtils (numbers, objects) {

        return {
            getKey          : getKey,
            getOperation    : getOperation,
            getAuditFields  : getAuditFields
        };

        function getKey (schema, pathName) {

            var field   = schema.paths[pathName];
            var options = (field && field.options) ? field.options : {};

            var key;
            if (pathName === '_id') { key = 'id'; }
            else if (options && options.key) { key = options.key; }
            else if (options && options.name) { key = options.name; }
            else if (options && options.ref) { key = options.ref; }
            else { key = pathName; }

            if (key.indexOf('.') < 0 && key.trim().indexOf(' ') < 0) {
                return objects.toKey(key);
            } else {
                return key;
            }
        }

        function getOperation (schema, pathName, attributeName) {
            var field = schema.paths[pathName];
            if (!field || !field.options) { return null; }
            var setting = field.options[attributeName];
            if (typeof setting === 'undefined') { return null; }
            return numbers.parseOperation(setting);
        }

        function getAuditFields (schema) {

            var result = {};

            schema.eachPath(function(pathName, schemaType){

                var field   = schema.paths[pathName];
                var options = (field && field.options) ? field.options : {};

                switch (options.auditType) {
                    case 'CREATED':
                        result.created = field;
                        break;
                    case 'UPDATED':
                        result.updated = field;
                        break;
                    case 'DELETED':
                        result.deleted = field;
                        break;
                    case 'MEMBER':
                        result.member = field;
                        break;
                    default:
                        break;
                }
            });

            return result;
        }
    }

})();

(function () {

    'use strict';

    angular.module('mf-utils-angular').factory('sessionUtils', sessionUtils);

    sessionUtils.$inject = ['$auth'];
    function sessionUtils ($auth) {

        return {
            get userId () { return userId(); },
            get accountId () { return accountId(); },
            get fullUserId () { return fullUserId(); },

            get isAuthenticated () { return $auth.isAuthenticated(); },
            get isLoggedIn () { return isLoggedIn(); },
            get isAccountSet () { return isAccountSet(); }
        };

        // ----------

        function userId () {
            return $auth.isAuthenticated() ? $auth.getPayload().sub : null;
        }
        function accountId () {
            return $auth.isAuthenticated() ? $auth.getPayload().aid : null;
        }

        function isLoggedIn () {
            var uid = (userId() || '').trim();
            return (uid.length > 0);
        }
        function isAccountSet () {
            var aid = (accountId() || '').trim();
            return (isLoggedIn() && aid.length > 0);
        }

        function fullUserId () {
            if (!userId()) { return 'public'; }
            if (!accountId()) { return userId(); }
            return userId() + '-' + accountId();
        }
    }

})();

/* jshint -W101 */

(function(){

    angular.module('mf-utils-angular').factory('stringUtils', stringUtils);

    stringUtils.$inject = [];
    function stringUtils () {

        var ALPHA           = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var DIGITS          = '0123456789';
        var ALPHANUMERIC    = ALPHA + DIGITS;
        var CURRENCY        = '$£€';

        return {
            ALPHA               : ALPHA,
            DIGITS              : DIGITS,
            ALPHANUMERIC        : ALPHANUMERIC,
            CURRENCY            : CURRENCY,

            clean               : clean,
            cleanAlphanumeric   : cleanAlphanumeric,
            cleanCurrency       : cleanCurrency,
            cleanDigits         : cleanDigits,
            cleanEntityName     : cleanEntityName,
            cleanKey            : cleanKey,
            cleanToken          : cleanToken,
            cleanVersion        : cleanVersion,

            isAlpha             : isAlpha,
            isAlphanumeric      : isAlphanumeric,
            isDigits            : isDigits,
            isLowerCase         : isLowerCase,
            isNumber            : isNumber,
            isUpperCase         : isUpperCase,
            isUuid              : isUuid,
            isValid             : isValid,
            isVersion           : isVersion,

            ifValid             : ifValid,

            randomString        : randomString,
            textContains        : textContains,

            toCamelCase         : toCamelCase,

            trim                : trim,
            trimFirst           : trimFirst,
            trimLast            : trimLast,

            unDouble            : unDouble,
            unique              : unique
        };

        // -----

        function clean (value, validChars, isCaseSensitive) {
            if (typeof isCaseSensitive === 'undefined') { isCaseSensitive = false; }
            return (value || '').toString().split('').filter(function(c){
                return ((isCaseSensitive && validChars.indexOf(c) >= 0) ||
                        (!isCaseSensitive && validChars.toUpperCase().indexOf(c.toUpperCase()) >= 0));
            }).join('');
        }
        function cleanAlphanumeric (value) {
            return clean(value, ALPHA + ALPHANUMERIC);
        }
        function cleanCurrency (value) {
            var result = '';
            (value || '').toString().split('').forEach(function(c){
                if (!result && CURRENCY.indexOf(c) < 0) {
                    /* jshint -W035 */
                    // Do nothing
                } else if (!result && CURRENCY.indexOf(c) >= 0) {
                    result += (c + ' ');
                } else if (c === '.' && result.indexOf('.') < 0) {
                    result += c;
                } else if (DIGITS.indexOf(c) >= 0 && (result.indexOf('.') < 0 || result.split('.')[1].length < 2)){
                    result += c;
                }
            });
            return result;
        }
        function cleanDigits (value) {
            return clean(value, DIGITS);
        }
        function cleanEntityName (value) {
            return unDouble(clean(value, ALPHANUMERIC + ',-. &/\\'));
        }
        function cleanKey (value, tail) {
            value = trimFirst(clean(unDouble(value), ALPHANUMERIC + '-'), '-');
            if (!tail) { value = trimLast(value, '-'); }
            return value.toLowerCase();
        }
        function cleanToken (value) {
            return unDouble(clean(value, ALPHANUMERIC)).toUpperCase();
        }
        function cleanVersion (value, tail) {
            tail = (typeof tail === 'undefined' || tail === null || tail) ? true : false;
            value = (value || '').split('').filter(function(c){
                return ((DIGITS + '.').indexOf(c) >= 0);
            }).join('');
            if (tail && value.length > 1 && value.split('')[value.length - 1] === '.') { return value; }
            if (value.indexOf('.') >= 0) {
                value = value.split('.').filter(function(part){
                    return (part.length > 0);
                }).join('.');
            }
            return value;
        }

        function isUpperCase (value) {
            var test = (value || '').toUpperCase();
            return (test === value);
        }

        function isLowerCase (value) {
            var test = (value || '').toLowerCase();
            return (test === value);
        }

        function toCamelCase (value) {
            return value.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
              return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        }

        function isValid (value, chars, isCaseSensitive) {
            if (!value ||
                !value.length ||
                Object.prototype.toString.call(value) !== '[object String]') {
                return false;
            }
            if (typeof chars === 'string' && chars.length > 0) {
                var _value = (!!isCaseSensitive) ? value : value.toLowerCase();
                var _chars = (!!isCaseSensitive) ? chars : chars.toLowerCase();
                for (var i = 0; i < _value.length; i += 1) {
                    if (_chars.indexOf(_value[i]) < 0) { return false; }
                }
                return true;
            } else {
                return (value.trim().length > 0);
            }
        }
        function ifValid (value, defaultValue) {
            return isValid(value) ? value : defaultValue;
        }

        function isAlpha (value) {
            return isValid(value, ALPHA, false);
        }
        function isDigits (value) {
            return isValid(value, DIGITS);
        }
        function isAlphanumeric (value) {
            return isValid(value, ALPHANUMERIC, false);
        }
        function isNumber(val) {
            // negative or positive
            return (/^[-]?\d+$/).test(val);
        }
        function isUuid (value) {
            if (!angular.isString(value) || value.length !== 32) { return false; }
            var invalid = (value || '').split('').find(function(c){
                return ('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.indexOf(c) < 0);
            });
            return (!invalid);
        }
        function isVersion (value) {
            return (value && value === cleanVersion(value, false));
        }

        function unDouble (value) {
            var chars = (value || '').toUpperCase().split('').filter(function(c){
                return (ALPHANUMERIC.indexOf(c) < 0);
            });
            if (chars.length < 1) { return value; }
            chars.forEach(function(c){
                var target = [c, c].join('');
                while (value.indexOf(target) >= 0) {
                    value = value.replace(target, c);
                }
            });
            return value;
        }

        function unique (values) {
            var result = [];
            [].concat(values).filter(function(v){
                return (typeof v === 'string' && v.trim().length > 0);
            }).forEach(function(value){
                if (result.indexOf(value) < 0) { result.push(value); }
            });
            return result;
        }

        function trim(value) {
            return ifValid(value) ? value.trim() : undefined;
        }

        function trimFirst (value, chars, isCaseSensitive) {
            if (typeof value !== 'string' || value.lenth < 1) { return value; }
            if (typeof value !== 'string' || chars.legnth < 1) { chars = value.split('')[0]; }
            if (isCaseSensitive !== true && isCaseSensitive !== false) { isCaseSensitive = false; }
            if (chars.indexOf(value.split('')[0]) >= 0 ||
                (!isCaseSensitive && chars.toLowerCase().indexOf(value.toLowerCase().split('')[0]) >= 0)) {
                    return value.substr(1);
                }
            return value;
        }
        function trimLast (value, chars, isCaseSensitive) {
            if (typeof value !== 'string' || value.lenth < 1) { return value; }
            if (typeof value !== 'string' || chars.legnth < 1) { chars = value.split('')[value.length - 1]; }
            if (isCaseSensitive !== true && isCaseSensitive !== false) { isCaseSensitive = false; }
            if (chars.indexOf(value.split('')[value.length - 1]) >= 0 ||
                (!isCaseSensitive && chars.toLowerCase().indexOf(value.toLowerCase().split('')[value.length - 1]) >= 0)) {
                    return value.substr(0, (value.length - 1));
                }
            return value;
        }


        function randomString(length, chars) {
            length = length || 6;
            chars = chars || ALPHANUMERIC;
            var result = '';
            for (var i = length; i > 0; --i) { result += chars[Math.floor(Math.random() * chars.length)]; }
            return result;
        }

        function textContains(text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }

    }

})();

(function(){

    'use strict';

    angular.module('mf-utils-angular').factory('uuidUtils', uuidUtils);

    uuidUtils.$inject = ['stringUtils'];
    function uuidUtils (strings) {

        var EMPTY_UID   = '00000000000000000000000000000000';
        var EMPTY_V1    = '00000000-0000-0000-0000-000000000000';
        var EMPTY_V4    = EMPTY_V1;

        return {
            EMPTY_UID       : EMPTY_UID,
            EMPTY_V1        : EMPTY_V1,
            EMPTY_V4        : EMPTY_V4,
            isValidUidType  : isValidUidType,
            init            : init,
            isValid         : isValid,
            ifValid         : ifValid,
            isValidUid      : isValidUid,
            isValidV4       : isValidV4
        };

        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }

        function mockV4() {
            /**! http://stackoverflow.com/a/2117523/377392 */
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }

        function init (uidType) {
            if (typeof uidType === 'undefined') { uidType = 'uid'; }
            switch (uidType) {
                case 'uid':
                case 'v1':
                    return mockV4().toUpperCase().split('-').join('');
                case 'v4':
                    return mockV4().toLowerCase().toString();
                default:
                    return null;
            }
        }

        function isValidUidType (value) {
            if (typeof value !== 'string') { return false; }
            return ['uid', 'v1', 'v4'].indexOf(value.trim().toLowerCase() >= 0);
        }

        function isValidUid (value, isEmptyOkay) {
            if (!strings.isValid(value)) { return false; }
            if (value === EMPTY_UID) { return (!!isEmptyOkay); }
            if (!strings.isValid(value, strings.ALPHANUMERIC, true)) { return false; }
            return (value.length === 32);
        }
        function isValidV4 (value, isEmptyOkay) {
            if (!strings.isValid(value)) { return false; }
            if (value === EMPTY_V4) { return (!!isEmptyOkay); }
            if (!strings.isValid(value, strings.ALPHANUMERIC + '-', false)) { return false; }
            var parts = value.split('-');
            return (parts.length === 5 &&
                    parts[0].length === 8 &&
                    parts[1].length === 4 &&
                    parts[2].length === 4 &&
                    parts[3].length === 4 &&
                    parts[4].length === 12);
        }

        function isValid (value, isEmptyOkay) {
            return (isValidUid(value, isEmptyOkay) || isValidV4(value, isEmptyOkay));
        }

        function ifValid (value, isEmptyOkay, defaultValue) {
            var _emptyOkay;
            var _default;
            if (typeof isEmptyOkay === 'boolean') {
                _emptyOkay = isEmptyOkay;
                _default = defaultValue;
            } else {
                _default = isEmptyOkay;
            }
            return (isValid(value, _emptyOkay) ? value : _default);
        }

    }

})();
