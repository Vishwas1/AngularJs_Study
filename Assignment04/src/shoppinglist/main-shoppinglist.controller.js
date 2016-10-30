// (function () {
// 'use strict';
//
// angular.module('ShoppingList')
// .controller('MainShoppingListController', MainShoppingListController);
//
//
// MainShoppingListController.$inject = ['ShoppingListService'];
// function MainShoppingListController(ShoppingListService) {
//   var mainList = this;
//   mainList.items = [];
//
//   mainList.$onInit = function () {
//     ShoppingListService.getItems()
//     .then(function (result) {
//       mainList.items = result;
//     });
//   };
// }
//
// })();
(function () {
'use strict';

angular.module('ShoppingList')
.controller('MainShoppingListController', MainShoppingListController);


MainShoppingListController.$inject = ['ShoppingListService', 'items'];
function MainShoppingListController(ShoppingListService, items) {
  var mainList = this;
  mainList.items = items;
}

})();
