(function () {
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    ctrl = this;
    ctrl.found = []
    ctrl.narrow = function() {
      MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function(res) {
        ctrl.found = res;
      });
    }
    ctrl.removeItem = function(index) {
      ctrl.found.splice(index, 1);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + '/menu_items.json')
      }).then(function(result){
        var itemsList = result.data.menu_items;
        itemList = itemsList.filter(function(item){
          if(searchTerm == '') {
            return false;
          }
          return item.description.includes(searchTerm);
        });
        return itemList;
      })
    }
  }
  function FoundItemsDirective(){
    return {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'itemsCtrl',
      bindToController: true
    };
  }
  function FoundItemsDirectiveController() {
    itemsCtrl = this;
  }
})();
