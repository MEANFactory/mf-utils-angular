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
