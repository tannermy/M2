angular.module('shopping', [])
.controller('MainCtrl', [
  '$scope',
  '$http',
  function($scope, $http){
    $scope.products = [];
    $scope.checkedout = [];
    $scope.addProduct = function() {
      if($scope.formContent === '') { return; }
      if($scope.imageContent === '') { return; }
      if($scope.priceContent === '') { return; }
      console.log("In addProduct with "+$scope.formContent);
      $scope.create({
        title: $scope.formContent,
        buys: 0,
	price: $scope.priceContent,
        image: $scope.imageContent
      });
      $scope.formContent = '';
      $scope.imageContent = '';
      $scope.priceContent = '';
    };
    $scope.incrementBuys = function(product) {
      $scope.buy(product);
    };
    $scope.getAll = function() {
      return $http.get('/products').success(function(data){
        angular.copy(data, $scope.products);
      });
    };
    $scope.create = function(product) {
      return $http.post('/products', product).success(function(data){
        $scope.products.push(data);
      });
    };
    $scope.buy = function(product) {
      return $http.put('/products/' + product._id + '/buy')
        .success(function(data){
          console.log("buy worked");
          product.buys += 1;
        });
    };
    $scope.checkout = function() {
      $scope.checkedout = [];
      angular.forEach($scope.products, function(product, key) {
        if(product.checked) {
	  $scope.buy(product);
	  $scope.checkedout.push(product);
	  product.checked = false;
	}
      });
    };
    $scope.delete = function(product) {
      $http.delete('/products/' + product._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

  $scope.getAll();
  }
]);
