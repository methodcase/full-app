angular.module('app.controllers',[])
.controller('HomeCtrl', HomeController)	
.controller('AddCtrl', AddController)
.controller('ViewCtrl', ViewController);

function HomeController ($scope, $http) {	
	$http.get('/rest/article').
	  success(function(data, status, headers, config) {     
	  	$scope.articles = data;
	  }).
	  error(function(data, status, headers, config) {
	  });	
}

function ViewController($scope, $http, $stateParams){
	$scope.uni = $stateParams.id;
	
	$http.get('/rest/view/article/'+$scope.uni).
	  success(function(data, status, headers, config) {     
	  	$scope.article = data;
	  }).
	  error(function(data, status, headers, config) {
	  });	
}

function AddController ($scope, $http){	
}