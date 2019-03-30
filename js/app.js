var app = angular.module("myZooApp", ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

  $locationProvider.hashPrefix('');

  $routeProvider
    .when("/", {
      templateUrl : "views/animalList.html",
      controller : "homeCtrl"
    })
    .when("/:name/", {
      templateUrl : "views/animalList.html",
      controller : "animalListCtrl"
    })
    .otherwise({
      redirectTo: "/"
    })
}]);

app.service("AnimalService", function() {
  var animalService = {};

  animalService.animalList = [
    {name:"Zebra", description:"Zebras are several species of African equids united by their distinctive black and white stripted", icon : "images/zebra.jpg"},
    {name:"Elephant", description:"Elephants are .....", icon : "images/elephant.jpeg"},
    {name:"Tiger", description:"Tigers are ...", icon : "images/tiger.jpeg"},
    {name:"Lion", description:"Lions are ...", icon : "images/lion.jpeg"}
  ];

  animalService.findByName = function (name) {
    for(var animal in animalService.animalList) {
      if(animalService.animalList[animal].name === name) {
        return animalService.animalList[animal];
      }
    }
  }
  animalService.selectedAnimal = function(entry) {

  }

  return animalService;
});

app.controller("homeCtrl", ["$scope" , "AnimalService", function($scope, AnimalService) {

  $scope.animalList = AnimalService.animalList;

}]);

app.controller("animalListCtrl", ["$scope", "$routeParams" , "$location","AnimalService", function($scope, $routeParams, $location, AnimalService) {
  console.log($routeParams.name);

  if(!$routeParams.name) {
    $location.path("/");
  }
  else {
    $scope.animal = AnimalService.findByName($routeParams.name);
  }

  $scope.selectedAnimal = function(entry) {
    AnimalService.selectedAnimal($scope.animal);
    $location.path("/" + $scope.animal.name);
  }
}]);

app.directive("animalPresentation", function() {
  return {
      restrict : "E",
      templateUrl : "views/animal.html"
  };
});
