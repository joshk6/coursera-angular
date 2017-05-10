(function() {
  angular.module('Datathing')
    .service('MenuDataService', MenuDataService)
    .constant('ApiPath', "https://davids-restaurant.herokuapp.com");
  //  https://davids-restaurant.herokuapp.com/categories.json
  //https://davids-restaurant.herokuapp.com/menu_items.json?category=
  MenuDataService.$inject = ['$q', '$http', 'ApiPath']

  function MenuDataService($q, $http, ApiPath) {
    var service = this;
    // List of shopping items
    var items = [];
    var categories;
    var categoryShortName;

    service.getAllCategories = function() {
      var deferred = $q.defer();
      if (categories == null) {
        var promise = fetchCategories();
        promise.then(function(response) {
          console.log("Response from call", response);
          categories=[];
          var mydata = response.data;
          mydata.forEach( function(myitem) {
            var item = {category: myitem.name,
                        short_name: myitem.short_name
                      };
            categories.push(item);
          });

          deferred.resolve(categories);
        }, function(error) {
          console.log("An error: ", error);
          var errMessage = "Fetch categories failed";
          deferred.reject(errMessage);
        });
      } else {
        deferred.resolve(categories);
      };
      return deferred;
    };
    service.getItemDetail= function(shortName) {
      console.log("shortName: ", shortName);
      var deferred = $q.defer();
      var promise = fetchItems(shortName);
      promise.then(function (response) {
        deferred.resolve(response);
      }, function(error) {
        deferred.reject(errMessage);
      });
      return deferred;
    }

    service.getItemsForCategory = function(categoryShortName) {

    }

    function fetchCategories() {
      var response = $http({
        method: "GET",
        url: (ApiPath + "/categories.json")
      });
      return response;
    }
    function fetchItems(name) {
      var response = $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json?category=" + name )
      });
      return response;
    }
  }
})();
