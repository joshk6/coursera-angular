(function() {
  'use strict'
  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'main.html'
        //    controller: 'MainController as main'
      })
      .state('main.categories', {
        url: 'main/categories',
        templateUrl: 'categories.html',
        controller: 'CategoriesController as cats',
        resolve: {

          catsList: ['MenuDataService', function(MenuDataService) {
              var deferred = MenuDataService.getAllCategories();
              console.log("main Promise: ", deferred.promise);
                  return deferred.promise;
            }]
        }
      })
      .state('main.categories.itemDetail', {
        url: '/itemDetail/{short_name}',
        templateUrl: 'item_detail.html',
        controller: 'ItemDetailController as idet',
        resolve: {
          items: ['$stateParams', 'MenuDataService',
          function ($stateParams, MenuDataService) {
            var deferred = MenuDataService.getItemDetail($stateParams.short_name);
            console.log("Promise: ", deferred.promise);
            return deferred.promise;

          }]
        }
      });

    $urlRouterProvider.otherwise('/');
  }


})();
