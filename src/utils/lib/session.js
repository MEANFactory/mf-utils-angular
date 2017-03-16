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
