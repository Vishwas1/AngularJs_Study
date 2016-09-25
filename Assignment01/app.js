(function(){
  'use strict'
  //declare angular app.
  var app =  angular.module('LunchCheck',[]);
  app.controller('LunchCheckController',LunchCheckController);
  app.controller.$inject = ['$scope'];
  function LunchCheckController($scope){
    $scope.name="";
    $scope.message ="";
    $scope.CheckForItems =function(){
      var items = $scope.name.split(',');
      //debugger;
      if(items!=null && items!=''){
        items = items.filter(o=>o!=''); //linq in Js
        if(items.length <= 3){
          $scope.message="Enjoy!";
        }else{
          $scope.message="Too much!";
        }
      }else{
        $scope.message="Please enter data first";
      }

    };

  }


})();
