// Node.JS Packages
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var colors = require("colors");

colors.setTheme({
  title: ['white', 'italic'],
  error: ['bgRed', 'white', 'title'],
  info: ['bgYellow', 'white', 'italic'],
  success: ['bgGreen', 'white'],
});

console.log("App.JS: ".title + " Successfully Imported Required Packages".success);

// Imports for External Refresh Node.JS Functions
var list = require('./modules/list.js');
var examBoard = require('./modules/exam.js');
var scrape = require('./modules/scrape.js');
var convert = require('./modules/convert.js');
var research = require('./modules/research.js');
var question = require('./modules/question.js');
var answer = require('./modules/answer.js');
var database = require('./data_base.js');
console.log("App.JS: ".title + " Successfully Imported External Functions".success);

// Instantiating External Refresh Packages
var listModule = new list();
var examBoardModule = new examBoard();
var scrapeModule = new scrape();
var convertModule = new convert();
var researchModule = new research();
var questionModule = new question();
var answerModule = new answer();
var databaseModule = new database();
console.log("App.JS: ".bold + " Successfully Instantiated Packages".blue);

var databaseModule = new database();


// Creating Express.JS Web Server
var app = express();
console.log("App.JS: ".title + " Successfully Initialised Express.JS Web Server".success);

// Initialising Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());
console.log("App.JS: ".title + " Successfully Initialised Middleware".success);


// Creating Static Public Folder
app.use(express.static('public'));
console.log("App.JS: ".title + " Successfully Created Public Folder".success);


// App Routes
app.get("/", function (req, res) {
    fs.readFile("pages/index.html", "ASCII", function (err, data) {
        res.send(data);
    });
});

app.post("/register", function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.eMail;
    var password = req.body.pass;
    var username = req.body.uName;
    databaseModule.addUser(firstName, lastName, email, password, username, function() {
        fs.readFile("pages/syllabus-choice.html", "ASCII", function(err, data) {
            res.send(data);
        });                   
    });
    console.log(firstName + " " + lastName + " " + email + " " + password + " " + username);
});

app.get("/finnTest", function(req, res) {
    fs.readFile("pages/syllabus-choice.html", "ASCII", function(err, data) {
        res.send(data);
    }); 
});

app.get("/login", function(req, res) {
    res.send("Login Page");
});

app.get("/dashboard", function(req, res) {
    researchModule.researchTopic("properties of solids", "state", function(output) {
        res.send(output);
    });
});

app.post("/dashboard", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    
    // MySQL Shit
    // That Tom needs to do...

    // Paste this inside your callback
    // Template Engine Stuff Goes Here
});

app.post("/createSyllabus", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var examBoard = req.body.examBoard;
    var subject = req.body.subject;
    var syllabus = req.body.syllabus;
});

app.get("/revise", function (req, res) {
    // Login Stuff
    var email = req.body.email;
    var password = req.body.password;
    var examBoard = req.body.examBoard;
    var subject = req.body.subject;
    var syllabus = req.body.syllabus;
    
    databaseModule.login(email, password, function(output) {
        if (output == true) {
            
        }
    });
});

app.post("/CIE", function(req, res) {
    listModule.examBoardCIE(function(data) {
        res.send({ subjectData: data });
    });
});

app.post("/CIEsubject", function(req, res) {
    var syllabusNumber = String(req.body.syllabusNumber);
    console.log(syllabusNumber);
    examBoardModule.collectURLs(syllabusNumber, function(data) {
        res.send(data);
    });
});

app.post("/chooseSubject", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var examBoard = req.body.examBoard;
    var subject = req.body.subject;
    var syllabus = req.body.syllabus;
});

// Initialising the Express.JS Web Server to Listen on Port 3000
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("App.JS".title + " Refresh Running at localhost:3000".success);
});
