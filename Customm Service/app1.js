(function (){
'use strict';
var app = angular.module('MyAngApp',[]);

app.controller('AddProductsController',AddControllerFunction);
// app.controller('ShowProductsController',ShowControllerFunction);
app.service('ShoppingListService',ShoppingListService);

AddControllerFunction.$inject = ['ShoppingListService'];
function AddControllerFunction(ShoppingListService){
  var product = this;
  product.name="";
  product.quantity = "";
  product.GrandTotal = 0;
  product.errorMsg="";
  product.AddToList = function (){
    try{
      var productObj = new Product(product.name,product.quantity);
      ShoppingListService.AddItem(productObj);
      product.GrandTotal = ShoppingListService.GrandTotal();
    }catch(ex){
      product.errorMsg = ex.message;
    }
  };

  product.RemoveItem = function (index){
    ShoppingListService.RemoveItem(index);
    product.GrandTotal  = ShoppingListService.GrandTotal();
  };

  product.shoppingList =  ShoppingListService.GetItems();
}


function Product(name , quantity){
  this.name = name;
  this.quantity = quantity;
}


// ShowControllerFunction.$inject = ['ShoppingListService'];
// function ShowControllerFunction(ShoppingListService){
//   var p = this;
//   p.shoppingList =  ShoppingListService.GetItems();
//   p.GrandTotal = 0;
//   p.RemoveItem = function (index){
//     //debugger;
//     ShoppingListService.RemoveItem(index);
//     p.GrandTotal  = ShoppingListService.GrandTotal();
//   };
//
//
// }


})();
