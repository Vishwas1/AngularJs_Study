(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'http://vishwas1-angular.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
