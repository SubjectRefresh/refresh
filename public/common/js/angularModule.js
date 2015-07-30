// JavaScript Document

(function() {
	var app = angular.module("Refresh", []);
	app.controller("RefreshController", function() {
		this.firstname = "Dorris";
	});
    app.watch('selectedTestAccount', function(newValue){
        alert(newValue);
    });
})()