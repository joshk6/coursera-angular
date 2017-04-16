(function() {

  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchController', LunchController);

  LunchController.$inject = ['$scope', '$filter'];


  function LunchController($scope, $filter) {
    $scope.lunchString = "";
    $scope.lunchMessage = "";
    $scope.checkLunch = function () {
      var count = getItemCount();
      if (count > 3) {
        $scope.lunchMessage = "Too much!"
      } else if (count==0){
        $scope.lunchMessage = "Please enter data first";
      } else {
        $scope.lunchMessage =  "Enjoy!";
      }

    }
    function getItemCount() {
      if ($scope.lunchString=="") return 0;
      var items = $scope.lunchString.split(",");
      return items.length;
    }
  }



})();
