(function() {
  'use strict';
  angular.module('MenuApp')
  .controller('ItemDetailController', ItemDetailController);

  ItemDetailController.$inject= ['items', '$filter'];
  function ItemDetailController(items, $filter) {
    var ctrl=this;

    ctrl.errorMessage="No errors";

    ctrl.items=items.data.menu_items;
    console.log("item:", ctrl.items);

  };

  // ItemDetailController.$inject= ['MenuDataService', '$q', 'catsList'];
  // function ItemDetailController(MenuDataService, $q, catsList) {
  //   var ctrl=this;
  //   ctrl.cats = [];
  //   ctrl.errorMessage="No errors";
  //
  //   ctrl.catsList=catsList;
  //   console.log("catsList:", catsList);
  //   ctrl.getCategories = function() {
  //     var deferred = MenuDataService.getAllCategories();
  //
  //     deferred.promise.then(function(response) {
  //       console.log("Response:", response);
  //       ctrl.cats=response ;
  //     }, function(Error) {
  //       ctrl.errorMessage="Errors happened";
  //       return "Could not get categoreis"}
  //   );
  //
  //   }

})();
