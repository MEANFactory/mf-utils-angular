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
