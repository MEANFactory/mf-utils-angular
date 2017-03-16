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
