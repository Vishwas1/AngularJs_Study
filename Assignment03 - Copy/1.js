(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "//davids-restaurant.herokuapp.com")
  .directive('foundItemsDisplay',foundItemsDisplayDirective);


  function foundItemsDisplayDirective()
  {

  var ddo = {
    templateUrl: 'ItemDisplay.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FounDItemDirectiveController,
    controllerAs: 'foundlist',
    bindToController: true,


  };

  return ddo;
}

function FounDItemDirectiveController(){
  var foundlist = this;
}

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var ctrl = this;

    ctrl.searchTerm = "";
    ctrl.NarrowMe = function(){
      ctrl.foundItems =[];
      if(ctrl.searchTerm)
      {
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

       promise.then(function (response) {
          ctrl.foundItems = response;
      })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }
}

    ctrl.removeItem = function (itemIndex) {
    ctrl.foundItems.splice(itemIndex,1);
    };
  }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http,ApiBasePath)
    {

     var service = this;

    service.getMatchedMenuItems = function (searchTerm) {

     return $http({
     method: "GET",
     url: (ApiBasePath + "/menu_items.json"),

   }).then(function (result){
     var foundItems = [];
    for(var i=0;i<result.data.menu_items.length;i++)
      if(result.data.menu_items[i].description.includes(searchTerm))
         foundItems.push(result.data.menu_items[i]);
      return foundItems;
   });

   //return response;
 };
    }


})();
