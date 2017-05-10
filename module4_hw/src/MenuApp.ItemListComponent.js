(function() {
angular.module('MenuApp')
.component('itemdetail', {
  templateUrl: 'detail.html',
  bindings: {
    items: '<'
  }
});



})();
