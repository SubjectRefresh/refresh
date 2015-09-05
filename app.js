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


// Imports for External Refresh Node.JS Functions
var list = require('./modules/list.js');
var examBoard = require('./modules/exam.js');
var scrape = require('./modules/scrape.js');
var convert = require('./modules/convert.js');
var research = require('./modules/research.js');
var question = require('./modules/question.js');
var answer = require('./modules/answer.js');
var database = require('./modules/database.js');
//console.log("App.JS: ".title + " Successfully Imported External Functions".success);

// Instantiating External Refresh Packages
var listModule = new list();
var examBoardModule = new examBoard();
var scrapeModule = new scrape();
var convertModule = new convert();
var researchModule = new research();
var questionModule = new question();
var answerModule = new answer();
var databaseModule = new database();
//console.log("App.JS: ".bold + " Successfully Instantiated Packages".blue);

var databaseModule = new database();

var sessionsActive = [];

function driveThru(sessionID, email, callback) {
    sessionsActive.push([sessionID, email]);
    setTimeout(function () {
        sessionsActive.shift();
    }, 1000);
    callback();
}

function createHash(callback) {
    var hash = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@£$%^&*()_+{}[];|<>,.?#±€~`";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    callback(text);
}

// Creating Express.JS Web Server
var app = express();
//console.log("App.JS: ".title + "Initialised Web Server".success);

// Initialising Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//console.log("App.JS: ".title + " Successfully Initialised Middleware".success);

// Creating Static Public Folder
app.use(express.static('public'));
//console.log("App.JS: ".title + " Successfully Created Public Folder".success);

// Pages Cache
var homeTemplate = "";
var dashboardTemplate = "";
var learnTemplate = "";

function refreshTemplateCache(callback) {
    count = 0;

    // Homepage Template
    fs.readFile("pages/index.html", "utf-8", function(err, data) {
        homeTemplate = data;
        count ++;
        if ((count == 3) && (callback !== undefined)) {
            callback();
        }
    });

    // Dashboard Template
    fs.readFile("pages/dashboard.html", "utf-8", function(err, data) {
        dashboardTemplate = data;
        count ++;
        if ((count == 3) && (callback !== undefined)) {
            callback();
        }
    });

    // Learning Environment Template
    fs.readFile("pages/learn.html", "utf-8", function(err, data) {
        learnTemplate = data;
        count ++;
        if ((count == 3) && (callback !== undefined)) {
            callback();
        }
    });
}

// Template Engine
function refreshRenderer(template, elementsToReplace, callback) {
    // Variables //
    var bracket = false;
    var handlebar = false;
    var endBracket = false;
    var tagID = "";
    var start = 0;
    var end = 0;
    var toReplace = [];

    // Collect Points to Template //
    for (i in template) {
        if (handlebar == true) {
            if (template[i] == "}") {
                if (endBracket == true) {
                    handlebar = false;
                    end = i;
                    toReplace.push([tagID.trim(), start, end]);
                    tagID = "";
                }
                endBracket = true;
            } else {
                tagID += template[i];
            }
        } else {
            endBracket = false;
        }

        if (template[i] == "{") {
            if (bracket == true) {
                handlebar = true;
            } else {
                start = i;
            }
            bracket = true;
        } else {
            bracket = false;
        }
    }

    var renderedWebpage = "";
    var previousStartPoint = 0;

    for (e in toReplace) {
        renderedWebpage += template.substring(previousStartPoint, parseInt(toReplace[e][1]));
        renderedWebpage += elementsToReplace[toReplace[e][0]];
        previousStartPoint = parseInt(toReplace[e][2]) + 1;
    }

    renderedWebpage += template.substring(previousStartPoint, template.length);

    callback(renderedWebpage);
}

// App Routes

app.get("/", function (req, res) {
    console.log("/");
    fs.readFile("pages/index.html", "ASCII", function (err, data) {
        res.send(data);
    });
});

app.post("/register", function (req, res) {
    console.log("/register");
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.eMail;
    var password = req.body.pass;
    var username = req.body.uName;

    databaseModule.addUser(firstName, lastName, email, password, username, function (output) {
        if (output == true) {
            fs.readFile("pages/syllabus-choice.html", "ASCII", function (err, data) {
                res.send(data);
            });
        }

    });
});

app.get("/finnTest", function (req, res) {
    console.log("/finnTest");
    fs.readFile("pages/syllabus-choice.html", "ASCII", function (err, data) {
        res.send(data);
    });
});

app.get("/learn", function (req, res) {
    console.log("/learn");
    fs.readFile("pages/learn.html", "ASCII", function (err, data) {
        res.send(data);
    });
});

app.get("/dashboard", function (req, res) {
    console.log("GET /dashboard");
    fs.readFile("pages/dashboard.html", "ASCII", function (err, data) {
        res.send(data);
    });
});

app.get("/login", function (req, res) {
    console.log("/login");
    fs.readFile("pages/login.html", "ASCII", function (err, data) {
        res.send(data);
    });
});

app.get("/logout", function (req, res) {
    console.log("/logout");
    res.clearCookie('emai');
    res.clearCookie('loggedin');
    res.redirect("/", 301);
});

app.post("/checkLogin", function (req, res) {
    console.log("/checkLogin");
    var cookies = new Cookies(req, res),
        unsigned, signed, tampered;
    var password = req.body.password;
    var email = req.body.email;

    databaseModule.login(email, password, function (output) {
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

app.post("/CIE", function (req, res) {
    console.log("/CIE");
    listModule.examBoardCIE(function (data) {
        res.send({
            subjectData: data
        });
    });
});

app.post("/CIEsubject", function (req, res) {
    console.log("/CIEsubject")
    var syllabusNumber = String(req.body.syllabusNumber);
    //syllabusNumber = "0620";
    console.log(syllabusNumber);
    examBoardModule.collectURLs(syllabusNumber, function (data) {
        res.send(data);
    });
});

app.post("/dashboard", function (req, res) {
    console.log("POST /dashboard");
    try {
        var email = req.body.email;
        var password = req.body.password;
        var examBoard = req.body.examBoard;
        var subject = req.body.subject;
        var syllabus = req.body.syllabus;
        var url = req.body.url;
        databaseModule.login(email, password, function (output) {
            if (output != false) {
                databaseModule.createSyllabusEntry(email, examBoard, subject, syllabus, function () {
                    scrapeModule.convertPDF(examBoard, subject, syllabus, url, function () {
                        scrapeModule.scrape(examBoard, subject, syllabus, function (points) {
                            convertModule.convert(points, function (searchFields) {
                                researchModule.researchTopic(searchFields, function (usefulSentences) {
                                    questionModule.question(usefulSentences, function (toStore) {
                                        //fs.writeFile("files/" + subject + ".sentenceData", toStore, function (err) {
                                        //if (err) throw err;
                                        res.redirect(301, "/learn?subject=" + subject);
                                        //});
                                    });
                                })
                            });
                        });
                    });
                });
            } else {

            }
        });
    } catch (err) {
        console.log(String(err).red);
    }
});

app.post("/getLearnData", function (req, res) {
    console.log("/getLearnData");
    var subject = req.body.examSubject;
    subject = "0620";
    fs.readFile("files/" + subject + ".sentenceData", function (err, data) {
        if (err) {
            res.send("Error :(");
        } else {
            var buffer = JSON.parse(data);
            console.log(buffer);
            res.send(buffer);
        }
    });
});

// Initialising the Express.JS Web Server to Listen on Port process.argv[2]
if (process.argv[2] == undefined) {
    process.argv[2] = 80;
}

var server = app.listen(process.argv[2], function () {
    var host = server.address().address;
    var port = server.address().port;

    refreshTemplateCache();
    console.log("App.JS".title + ": " + "Refresh Running at".success + " " + String(host).blue + ":" + String(port).blue);
});
