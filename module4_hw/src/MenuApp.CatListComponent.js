(function() {
angular.module('MenuApp')
.component('catlist', {
  templateUrl: 'catlist.html',
  bindings: {
    list: '<'
  }
});



})();
