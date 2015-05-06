angular.module('app.controllers',[])

.controller('HomeCtrl', function($scope, $http){

	$http.get('/rest/article').
	  success(function(data, status, headers, config) {     
	  	$scope.articles = data;
	  }).
	  error(function(data, status, headers, config) {
	  });	
})
	
.controller('AddCtrl', function($scope, $http){
	
})

.controller('ViewCtrl', function($scope, $http, $stateParams){
	$scope.uni = $stateParams.id;
	
	$http.get('/rest/view/article/'+$scope.uni).
	  success(function(data, status, headers, config) {     
	  	$scope.article = data;
	  }).
	  error(function(data, status, headers, config) {
	  });	
});
