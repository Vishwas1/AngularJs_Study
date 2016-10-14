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
        //onRemove : '&'
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
  controller.showLoader =false;
  controller.GetFilteredItems = function(){
    controller.show =false;
    controller.showLoader =true;
    controller.message ="";
    if(controller.searchText != ""){
      var promise  = MenuSearchService.getMatchedMenuItems();
      promise.then(function (response){
        controller.found = [];
        for(var i=0 ; i< response.data.menu_items.length ;i ++){
          if(response.data.menu_items[i].description.indexOf(controller.searchText) > -1){
            controller.found .push(response.data.menu_items[i]);
          }
        }
        RefreshValidationMessage();
    }else{
      controller.found = [];
      RefreshValidationMessage();
    }
    });
    promise.catch(function (response){
      console.log(response);
      RefreshValidationMessage();
    });
  };

  controller.removeItem =function(index){
    controller.found.splice(index,1);
    RefreshValidationMessage();
  };

  function RefreshValidationMessage(){
    controller.searchText ="";
    controller.showLoader =false;
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
  service.getMatchedMenuItems= function () {
  return $http({
      method : "GET",
      url : ("https://davids-restaurant.herokuapp.com/menu_items.json")
    });
  };
}
})();
