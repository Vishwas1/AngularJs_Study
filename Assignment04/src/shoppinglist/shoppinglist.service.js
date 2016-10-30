(function () {
'use strict';

angular.module('ShoppingList')
.service('ShoppingListService', ShoppingListService);

ShoppingListService.$inject = ['$q', '$timeout'];
function ShoppingListService($q, $timeout) {
  var service = this;
  // List of shopping items
  var categories = [];
  // Pre-populate a no cookie list
  var items4 = [];
  items4.push({name:"Paneer Pokoda",img : "http://www.manjulaskitchen.com/blog/wp-content/uploads/paneer_pakoras.jpg"});
  items4.push({name:"Chicken Lollypop",img : "http://gujarati.oneindia.com/img/2016/05/25-1464156761-grow-taller-3.jpg"});
  items4.push({name:"Fish Fry",img : "https://a.ctimg.net/NyMbAWOCRH-kI4jRZX2zBw/simple-fried-fish-kerala-style-recipe-12656-dish.jpg"});
  categories.push({
    name: "Starter",
    items : items4
  });
  var items3 = [];
  items3.push({name:"Roshgulla",img : "http://www.crazypundit.com/wp-content/uploads/2014/02/rasgulla-Sweet.jpg"});
  items3.push({name:"IceCream",img : "https://s-media-cache-ak0.pinimg.com/originals/63/25/44/632544206d5b4445ec2efb2675571523.jpg"});
  items3.push({name:"Fruits Salad",img : "http://southernbite.com/wp-content/uploads/2012/05/SouthernBiteFruitSalad-2.jpg"});
  items3.push({name:"Kulfi",img : "http://cookingshooking.com/wp-content/uploads/2014/05/12.jpg"});
  categories.push({
    name: "Desert",
    items : items3
  });
  var items2 = [];
  items2.push({name:"Sahi Paneer",img : "http://1.bp.blogspot.com/-ddvBxz_Q7lc/T5HAxwvtcNI/AAAAAAAAAPI/HZNN6ERWoHI/s1600/P1100903.JPG"});
  items2.push({name:"Butter Chicken",img : "http://www.sanjeevkapoor.com/UploadFiles/RecipeImages/Butter_Chicken_foodfood.jpg"});
  items2.push({name:"Fish Curry",img :"https://i.ytimg.com/vi/hvEPRFd38dY/maxresdefault.jpg"});
  items2.push({name:"Pallak Paneer",img : "https://i.ytimg.com/vi/wte9YdbZzQE/hqdefault.jpg"});
  categories.push({
    name: "Main Course",
    items: items2
  });

  var items1 = [];
  items1.push({name:"Mocktail",img : "http://media1.santabanta.com/full1/Fare/Mocktails/mocktails-37a.jpg"});
  items1.push({name:"Cocktail",img : "http://weknowyourdreams.com/images/cocktail/cocktail-04.jpg"});
  items1.push({name:"Red Wine",img : "http://www.evineyardapp.com/blog/wp-content/uploads/2015/05/red-wine.jpg"});
  items1.push({name:"Bear",img : "http://i.ytimg.com/vi/8ii40PzUoKM/maxresdefault.jpg"});
  categories.push({
    name: "Drinks",
    items : items1
  });

  service.getItems = function () {
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(categories);
    }, 800);

    return deferred.promise;
  };
}

})();
