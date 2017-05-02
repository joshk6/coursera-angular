(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .constant('ApiPath', "https://davids-restaurant.herokuapp.com")
      .directive('foundItems',FoundItemsDirective);

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '=',
          onRemove: '&'
        },
    controller: NarrowItDownDirectiveController,
        controllerAs: 'ndc',
        bindToController: true
      };
      return ddo;
    }

    //Seems unnecesaary since there are no methods, but i need a directive controller context
    //in order to follow the instructions and use isolate scope for the directive.
    function NarrowItDownDirectiveController() { }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var narrowIt = this;
      var myService = MenuSearchService;
      narrowIt.listEmpty = false;
      narrowIt.found = [];
      narrowIt.searchTerm = "";
      narrowIt.errMessage = "";

      narrowIt.check = function() {
        if (narrowIt.searchTerm=='') {
          narrowIt.listEmpty=true;
          return;
        }
        narrowIt.searchTerm=narrowIt.searchTerm.toLowerCase();
        
        var promise = MenuSearchService.getMatchedMenuItems(narrowIt.searchTerm).promise;
        promise.then(function(response) {
            console.log("Success: " + response.length + " items retrieved"); //reponse data
            narrowIt.found=response;
            if (narrowIt.found.length==0) {
              narrowIt.found.listEmpty=true;
            } else {
              narrowIt.listEmpty=false;
            }
          })
          .catch(function(error) {
            console.log(error);
            narrowIt.errMessage = error;
          })
      }

      narrowIt.remove = function(index) {
        narrowIt.found.splice(index, 1);
        if (narrowIt.found.length==0) {
          narrowIt.listEmpty=true;

        }
      }
    }


    MenuSearchService.$inject = ['$http', 'ApiPath', '$q'];
    function MenuSearchService($http, ApiPath, $q) {
      var service = this;
      var menuItems; //maintains list retrieved from server so
                     //menu is fetched only once.

      service.getMatchedMenuItems = function(searchTerm) {
        var deferred = $q.defer();
        if (menuItems == null) {
          var promise = fetchItems();
          promise.then(function(response) {
            menuItems = response.data.menu_items;
            console.log("Results:", service.searchItems(menuItems, searchTerm));
            deferred.resolve(service.searchItems(menuItems, searchTerm));
          }, function(error) {
            console.log("An Error: ", error);
            var errMessage = "Fetch failed"
            deferred.reject(errMessage);
          });
        } else {
          //No need to fetch
          deferred.resolve(service.searchItems(menuItems, searchTerm));
        };
        return deferred;
      };

      function fetchItems() {
        var response = $http({
          method: "GET",
          url: (ApiPath + "/menu_items.json")
        });
        return response;
      }

      service.searchItems= function(items, searchTerm) {
        var list = [];
        var menuitems=items;
        for (var i = 0; i < menuitems.length; i++) {
          var item = menuitems[i];
          if (item.description.indexOf(searchTerm) != -1) {
            list.push(item);
          }
        }
        return list;
      }
    }
  })();
