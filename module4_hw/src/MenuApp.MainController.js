(function() {
  'use strict';
  angular.module('MenuApp')
  .controller('MainController', MainController);

  MainController.$inject= ['MenuDataService', '$q'];
  function MainController(MenuDataService, $q) {
    var ctrl=this;
    ctrl.cats = []
    ctrl.errorMessage="No errors"

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
