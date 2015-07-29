// Node.JS Packages
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var colors = require("colors");
console.log("App.JS: ".bold + " Successfully Imported Required Packages".green);


// Imports for External Refresh Node.JS Functions
var examBoard = require('./exam.js');
var convert = require('./convert.js');
var research = require('./research.js');
var question = require('./question.js');
var scrape = require('./scrape.js');
console.log("App.JS: ".bold + " Successfully Imported External Functions".green);


// Instantiating External Refresh Packages
var examBoardModule = new examBoard();
var convertModule = new convert();
var researchModule = new research();
var questionModule = new question();
var scrapeModule = new scrape();
console.log("App.JS: ".bold + " Successfully Instantiated Packages".green);


// Creating Express.JS Web Server
var app = express();
console.log("App.JS: ".bold + " Successfully Created Express.JS Web Server".green);


// Initialising Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());
console.log("App.JS: ".bold + " Successfully Initialised Middleware".green);


// Creating Static Public Folder
app.use(express.static('public'));
console.log("App.JS: ".bold + " Successfully Public Folder".green);



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
console.log("App.JS: ".bold + " Successfully Created App Route".green);


app.get("/sandpit", function (req, res) {
    // Login Stuff
    var username = "OliCallaghan";
    var examboard = "CIE";

    researchModule.researchTopic("structure of atoms", "", function (output) {
        res.send(output);
    });
});
console.log("App.JS: ".bold + " Successfully Created Sandpit".green);


// Initialising the Express.JS Web Server to Listen on Port 3000
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    scrapeModule.convertPDFtoHTML();
    

    console.log("Refresh Running at localhost:3000");
});
