(function (){
'use strict';
var app = angular.module('MyAngApp',[]);

app.controller('controller1',ControllerFunction);
controller1.$inject = ['$scope'];
function ControllerFunction($scope){
$scope.name="Vishwas";

}

var parentObject = {
obj = "I am parent",
obj2 = {
  obj3 = "I am inner object"
},
objMethod = function(){
  console.log("i am walking..");
}
};





})();
