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
    res.send("Hi");
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Refresh Running at localhost:3000");
});