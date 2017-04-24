(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  var myService = ShoppingListCheckOffService;
  toBuy.itemName = "";
  toBuy.itemQuantity = "";



  // toBuy.getItems = function() {
  //   var items = myService.getBoughtItems();
  //
  //   return items;
  // }
  toBuy.items = myService.getItemsToBuy();
  console.log(toBuy.items);
  toBuy.addItem = function () {
    myService.addItem(itemAdder.itemName, itemAdder.itemQuantity, false);
  }
  toBuy.removeItem = function () {
    myService.removeItem(itemIndex);
  }
  toBuy.buyItem = function(idex) {
    myService.buyItem(idex);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  var myService = ShoppingListCheckOffService;

  alreadyBought.items = myService.getBoughtItems();
  console.log("Bought items:", alreadyBought.items);

  // alreadyBought.addItem = function() {
  //   myService.addItem(alreadyBought.itemName, alreadyBought.quantity, true);
  // }
  //
  // alreadyBought.removeItem = function (itemIndex) {
  //   myService.removeItem(itemIndex);
  // };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{itemName: 'Horses', itemQuantity: 10 },
                    {itemName: 'Pigs', itemQuantity: 3},
                    {itemName: 'Chickens', itemQuantity: 25},
                    {itemName: 'Cows', itemQuantity: 12},
                    {itemName: 'Bulls', itemQuantity: 1},
                    {itemName: 'Sheep', itemQuantity: 5},
                    {itemName: 'Kittens', itemQuantity: 3},
                    {itemName: 'Donkeys', itemQuantity: 2},
                    {itemName: 'Border Collies', itemQuantity: 2}]
  var boughtItems=[];

  service.addItemToList = function (itemName, quantity, isBought) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    if (isBought) {
       boughtItems.push(item);
    }  else {
       toBuyItems.push(item);
    }
  };

  service.removeItem = function (itemIdex, isBought) {
    if (isBought) {
      boughtItems.splice(itemIdex, 1);
    } else {
      toBuyItems.splice(itemIdex, 1);
    }
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.getItemsToBuy = function () {
    return toBuyItems;
  }
  service.buyItem = function(idex) {
     var item = toBuyItems[idex];

     service.removeItem(idex, false);
     service.addItemToList(item.itemName, item.itemQuantity, true);
  }
}

})();
