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
