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
