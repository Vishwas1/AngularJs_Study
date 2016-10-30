(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config
ItemDetailController.$inject = ['$stateParams', 'items'];
function ItemDetailController($stateParams, items) {
  debugger;
  var itemDetail = this;
  var item = items[$stateParams.itemId];
  itemDetail.items = item.items;
}

})();
