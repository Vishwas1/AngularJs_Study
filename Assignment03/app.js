// (function (){
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
      //  onRemove : '&'
    }
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  debugger;
  var controller = this;
  controller.searchText ="";
  controller.loaderSrc= "/loading.gif";
  controller.found  = MenuSearchService.getMatchedMenuItemsHard();
  controller.message ="Total No. Of Records : "+ controller.found.length;
  controller.runTimeSearchText ="";
  controller.compositeSearchText ="";

  controller.removeItem =function(index){

    controller.found = MenuSearchService.removeItem(index);
    RefreshValidationMessage();
  };
  function RefreshValidationMessage(){
    //debugger;
    //controller.runTimeSearchText ="";
    controller.compositeSearchText ="";
    controller.searchText ="";
    if(controller.found.length === 0){
      controller.message ="Nothing found.";
    }else{
      controller.message = "Total No. Of Records : "+ controller.found.length;
    }
  }
  function removeFilter(){
    debugger;
  }

  controller.removeFilter =function (){
    debugger;

  //  append('<tr><td><div style="float:left;"><div class="keyword">'+controller.compositeSearchText+'<div ng-click="" class="cross">X</div></div></div></td>>/tr>');
    //controller.found =MenuSearchService.GetFilteredListForComposite();
    //RefreshValidationMessage();
  };
  controller.compositeSearch =function (){
    $('#refresh').css('display','block');
    $('#keywordsTable').append('<tr onClick="removeFilter(this);"><td ><div style="float:left;"><div class="keyword">'+controller.compositeSearchText+'<div  class="cross">x</div></div></div></td></tr>');
    controller.found =MenuSearchService.GetFilteredListForComposite();
    RefreshValidationMessage();
  };

  controller.clearCompositeFilters = function(){
    $('#keywordsTable')[0].innerHTML='';
    controller.found =MenuSearchService.getMatchedMenuItemsHard();
    RefreshValidationMessage();
  };
  controller.runtimeSearch = function (){
    controller.found = MenuSearchService.GetFilteredList(controller.runTimeSearchText);
    RefreshValidationMessage();
  };

  controller.GetFilteredItems = function(){
    debugger;
  //controller.found  = MenuSearchService.getMatchedMenuItems(controller.searchText);
  controller.message ="Loading...";
  controller.found  = MenuSearchService.GetFilteredList(controller.searchText);
  RefreshValidationMessage();
  };

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
  var service = this;
  var arr  = [];
  service.getMatchedMenuItems= function (serarchItem) {
  return $http({
      method : "GET",
      url : ("http://192.168.37.1/ResturantService/Service1.svc/AllMenuItems")
    }).then(function (response){
      console.log("success!!!");
      console.log(response);
      return arr;
    });
  };

  service.getMatchedMenuItemsHard = function (){
    arr = [];
    $('#loader').css('display','block');
      for(var i=0;i<200;i++){
        arr.push(new MenuItems(
          "Item - " + i,
          "Name "+i,
          i % 4 === 0 ? "vishwas" :"desc"+i,
          i % 2 === 0 ? (  i % 4 === 0  ? "images/chat_black1.png": "images/chat_black2.png")  : (i % 3 === 0 ? "images/chat1.png": "images/chat2.png"),
          i % 2 === 0 ? "Active" : "Inactive",
          i % 2 === 0 ? "100" : "500",
          10,
          i > 9 ? "12/12/20"+ i : "12/01/200" +i
        ));
      }
      $('#loader').css('display','none');
      return arr;
  };

  service.GetFilteredList = function(searchItem){
    var temparr= [];
    for(var i=0;i< arr.length;i++){
      if(arr[i].name.indexOf(searchItem) > -1 || arr[i].desc.indexOf(searchItem) >-1|| arr[i].status.indexOf(searchItem) > -1|| arr[i].price.indexOf(searchItem) > -1 || arr[i].date.indexOf(searchItem) > -1 ){
        temparr.push(arr[i]);
      }
    }
    return temparr;
  };
  service.removeItem = function (index){
    debugger;
    arr.splice(index,1);
    //arr.pop(arr[index]);
    return arr;
  };
  service.GetFilteredListForComposite =function (){
    var alltds = $('#keywordsTable').find('td');

    var temparr= [];
    for(var j =0 ;j <alltds.length;j++){
      var searchItem  =alltds[j].firstChild.firstChild.firstChild.nodeValue;
      if(j===0){
        for(var i=0;i< arr.length;i++){
          if(arr[i].name.indexOf(searchItem) > -1 || arr[i].desc.indexOf(searchItem) >-1|| arr[i].status.indexOf(searchItem) > -1|| arr[i].price.indexOf(searchItem) > -1 || arr[i].date.indexOf(searchItem) > -1 ){
            temparr.push(arr[i]);
          }
        }
      }else{
        var arr1=[];
        for(var k=0;k< temparr.length;k++){
          if(temparr[k].name.indexOf(searchItem) > -1 || temparr[k].desc.indexOf(searchItem) >-1|| temparr[k].status.indexOf(searchItem) > -1|| temparr[k].price.indexOf(searchItem) > -1 || temparr[k].date.indexOf(searchItem) > -1 ){
            arr1.push(temparr[k]);
          }
        }
        temparr= arr1;
      }
    }

    return temparr;


  };

}

function MenuItems(id,name,desc,src,status,price,quantityLeft,date){
  this.id=id;
  this.name=name;
  this.desc = desc;
  this.src = src;
  this.status =status;
  this.price = price;
  this.quantityLeft = quantityLeft;
  this.date = date;
}

function removeFilter(elm){
debugger;
//NarrowItDownController();
}

// })();
