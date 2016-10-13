(function (){
'use strict';
var app = angular.module('NarrowItDownApp',[]);
app.controller('NarrowItDownController',NarrowItDownController);
app.service('MenuSearchService',MenuSearchService);
app.directive('foundItems',foundItems);

function foundItems(){
  var ddo = {
    templateUrl  : 'menuList.html',
    scope : {
        list : '<myItems',
        onRemove : '&'
    }
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var controller = this;
//  controller.found  = [];
  controller.searchText ="";
  controller.message ="";
  controller.show =false;
  controller.GetFilteredItems = function(){
    controller.found  = MenuSearchService.getMatchedMenuItems(controller.searchText);
    debugger;
    RefreshValidationMessage();
    // promise.then(function (response){
    //   controller.found = [];
    //   for(var i=0 ; i< response.data.menu_items.length ;i ++){
    //     if(response.data.menu_items[i].description.indexOf(controller.searchText) > -1){
    //       controller.found .push(response.data.menu_items[i]);
    //     }
    //   }
    //   RefreshValidationMessage();
    // });
  };

  controller.removeItem =function(index){
    controller.found = MenuSearchService.removeItem(index);
    RefreshValidationMessage();
  };

  function RefreshValidationMessage(){
    controller.searchText ="";
    if(controller.found.length === 0){
      controller.message ="Nothing found.";
      controller.show =false;
    }else{
      controller.message = "Total No. Of Records : "+ controller.found.length;
      controller.show =true;
    }
  }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
  var service = this;
  var arr  = [];
  service.getMatchedMenuItems= function (serarchTerm) {
    debugger;


  return $http({
      method : "GET",
      url : ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (response){
      debugger;
      arr= [];
      for(var i=0 ; i< response.data.menu_items.length ;i ++){
        if(response.data.menu_items[i].description.indexOf(serarchTerm) > -1){
          arr.push(response.data.menu_items[i]);
        }
      }
      return arr;
    },function (response){
      console.log(response);
    })(serarchTerm);


//   return  $http({
//   method: 'GET',
//   url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
// }).then(function successCallback(response) {
//     // this callback will be called asynchronously
//     // when the response is available
//     arr= [];
//     for(var i=0 ; i< response.data.menu_items.length ;i ++){
//       if(response.data.menu_items[i].description.indexOf(serarchTerm) > -1){
//         arr.push(response.data.menu_items[i]);
//       }
//     }
//     return arr;
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//     console.log("Error : " + response);
//   })(serarchTerm);
  };

  service.removeItem = function (index){
    arr.splice(index,1);
    return arr;
  };
}
})();
