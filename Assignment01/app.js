(function (){
'use strict'
  var app = angular.module("myFirstApp",[]);
  app.controller('firstController', ControllerFunction);

  function ControllerFunction($scope,$filter){
    $scope.name="";
    $scope.length = 0;
    $scope.displayLength = function (){
       $scope.length  =   $scope.name.length;
    };
    $scope.upper = function(){
      var toUpper = $filter('uppercase');
      $scope.name = toUpper($scope.name);
    };

  }
})();
