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
