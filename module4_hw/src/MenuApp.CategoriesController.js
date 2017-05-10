(function() {
  'use strict';
  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject= ['MenuDataService', '$q', 'catsList'];
  function CategoriesController(MenuDataService, $q, catsList) {
    var ctrl=this;
    ctrl.cats = [];
    ctrl.errorMessage="No errors";

    ctrl.catsList=catsList;
    console.log("catsList:", catsList);
    ctrl.getCategories = function() {
      var deferred = MenuDataService.getAllCategories();

      deferred.promise.then(function(response) {
        console.log("Response:", response);
        ctrl.cats=response ;
      }, function(Error) {
        ctrl.errorMessage="Errors happened";
        return "Could not get categoreis"}
    );

    }
  }
})();
