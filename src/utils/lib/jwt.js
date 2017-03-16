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
