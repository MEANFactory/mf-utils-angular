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
