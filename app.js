// Node.JS Packages
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var colors = require("colors");
var cookieParser = require('cookie-parser');
var Cookies = require("cookies");

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
console.log("App.JS: ".title + " Successfully Initialised Middleware".success);

// Creating Static Public Folder
app.use(express.static('public'));
console.log("App.JS: ".title + " Successfully Created Public Folder".success);

// App Routes
app.get("/", function(req, res) {
    fs.readFile("pages/index.html", "ASCII", function(err, data) {
        res.send(data);
    });
});

app.post("/register", function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.eMail;
    var password = req.body.pass;
    var username = req.body.uName;

    databaseModule.addUser(firstName, lastName, email, password, username, function(output) {
        if (output == true) {
            fs.readFile("pages/syllabus-choice.html", "ASCII", function(err, data) {
                res.send(data);
            });
        }

    });
});

app.get("/finnTest", function(req, res) {
    fs.readFile("pages/syllabus-choice.html", "ASCII", function(err, data) {
        res.send(data);
    });
});

app.get("/learn", function(req, res) {
    fs.readFile("pages/learn.html", "ASCII", function(err, data) {
        res.send(data);
    });
});

app.get("/dashboard", function(req, res) {
    fs.readFile("pages/dashboard.html", "ASCII", function(err, data) {
        res.send(data);
    });
});

app.get("/login", function(req, res) {
    fs.readFile("pages/login.html", "ASCII", function(err, data) {
        res.send(data);
    });
});

app.get("/logout", function(req, res) {
    res.clearCookie('emai');
    res.clearCookie('loggedin');
    res.redirect("/", 301);
});

app.post("/checkLogin", function(req, res) {
    var cookies = new Cookies(req, res),
        unsigned, signed, tampered;
    var password = req.body.password;
    var email = req.body.email;

    databaseModule.login(email, password, function(output) {
        if (output != false) {
            console.log(output.Email, output.FirstName, output.LastName);
            cookies.set("emai", output.Email, {
                httpOnly: false
            });
            res.cookie('emai', output.Email, {
                maxAge: 900000,
                httpOnly: true
            });
            cookies.set("forename", output.FirstName, {
                httpOnly: false
            });
            cookies.set("surname", output.LastName, {
                httpOnly: false
            });
            cookies.set("loggedin", true, {
                httpOnly: false
            });
            res.redirect(301, '/dashboard?s=loggedin&email=' + email);
        } else {
            res.redirect(301, '/dashboard?s=incorrect_username_password');
        }
    });
});


app.post("/CIE", function(req, res) {
    listModule.examBoardCIE(function(data) {
        res.send({
            subjectData: data
        });
    });
});


app.post("/CIEsubject", function(req, res) {
    var syllabusNumber = String(req.body.syllabusNumber);
    //syllabusNumber = "0620";
    console.log(syllabusNumber);
    examBoardModule.collectURLs(syllabusNumber, function(data) {
        res.send(data);
    });
});

app.post("/dashboard", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var examBoard = req.body.examBoard;
    var subject = req.body.subject;
    var syllabus = req.body.syllabus;
    var url = req.body.url;
    databaseModule.login(email, password, function(output) {
        if (output != false) {
            databaseModule.createSyllabusEntry(email, examBoard, subject, syllabus, function() {
                scrapeModule.convertPDF(examBoard, subject, syllabus, url, function() {
                    scrapeModule.scrape(examBoard, subject, syllabus, function(points) {
                        convertModule.convert(points, function(searchFields) {
                            researchModule.researchTopic(searchFields, function (usefulSentences) {
                                questionModule.question(usefulSentences, function (toStore) {
                                    fs.writeFile("files/" + subject + ".sentenceData", toStore, function (err) {
                                        if (err) throw err;
                                        fs.readFile("pages/learn.html", "ASCII", function(err, data) {
                                            res.send(data); 
                                        });
                                    });
                                });
                            })
                        });
                    });
                });
            });
        } else {

        }
    });
});

app.get("/getGapFill", function(req, res) {
    fs.readFile("files/" + "0620" + ".sentenceData", "ASCII", function(err, data) {
        if (err) {console.log(err);}
        var buffer = JSON.parse(data);
        console.log(buffer);
        res.send(buffer);
    });
});

// Initialising the Express.JS Web Server to Listen on Port process.argv[2]
if (process.argv[2]) {

} else {
    process.argv[2] = 80;
}
var server = app.listen(process.argv[2], function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App.JS".title + " Refresh Running at ".success + String(host).blue + ":".success + String(port).blue);
});