var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(express.static('public'));

app.get("/", function(req, res) {
    fs.readFile("pages/index.html", "ASCII", function(err, data) {
        res.send(data);
    });
});

app.post("/dashboard", function(req, res) {
    // MySQL Shit
    // That Tom needs to do...
    
    // Paste this inside your callback
    // Template Engine Stuff Goes Here
});

app.post("/sandpit", function(req, res) {
    // Login Stuff
    var username = "OliCallaghan"
    var examboard = "CIE"
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Refresh Running at localhost:3000");
});