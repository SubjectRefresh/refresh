// Node.JS Packages
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");

// Imports for External Refresh Node.JS Functions
var examBoard = require('./exam.js');
var convert = require('./convert.js');
var research = require('./research.js');
var question = require('./question.js');

// Instanciating External Refresh Packages
var examBoardModule = new examBoard();
var convertModule = new convert();
var researchModule = new research();
var questionModule = new question();

// Creating Express.JS Web Server
var app = express();

// Initialising Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());

// Creating Static Public Folder
app.use(express.static('public'));


// App Routes
app.get("/", function (req, res) {
    fs.readFile("pages/index.html", "ASCII", function (err, data) {
        res.send(data);
    });
});

app.post("/dashboard", function (req, res) {
    // MySQL Shit
    // That Tom needs to do...

    // Paste this inside your callback
    // Template Engine Stuff Goes Here
});

app.get("/sandpit", function (req, res) {
    // Login Stuff
    var username = "OliCallaghan";
    var examboard = "CIE";

    examBoardModule.examBoardCIE(function (output) {
        res.send(output);
    });
});

// Initialising the Express.JS Web Server to Listen on Port 3000
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Refresh Running at localhost:3000");
});
question.questionModule([])
