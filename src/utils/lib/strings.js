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
