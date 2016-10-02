// (function(){
// 'use strict';
  function ShoppingListService(){
    var service = this;
    var items = [];
    var maxItems = 5;
    service.AddItem = function(productObj){
      debugger;
    if(items.length < maxItems )
        items.push(productObj);
    else {
      throw new Error("Size exceeds.")
    }
  }

    service.RemoveItem = function(index){
      //debugger;
      items.splice(index,1);
    };

    service.GetItems = function(){
      return items;
    };

    service.GrandTotal = function(){
      debugger;
        var total  = 0;
        for(var i=0; i< items.length ; i++){
          total =total + parseInt(items[i].quantity);
        }
        return total;
    };


  }


// })();
