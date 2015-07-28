var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var colors = require('colors');

console.log("Exam.JS:".bold + " Successfully Imported Required Packages".green);

var examBoardModule = function() {
    var self = this;

    self.examBoardCIE = function(callback) {
        request('http://www.cie.org.uk/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/subjects/', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Exam.JS:".bold + " Successfully Requested Subject List".green);
                $ = cheerio.load(body);

                data = cleanArray($('.emphasized-link').text().replace(/ +?|\r/g, '').split("\n"));
                subjectArray = [];

                for (i = 0; i < data.length; i++) {
                    if (data[i] != "New" && data[i] != "Live") {
                        subjectArray.push(data[i]);
                    }
                }

                for (i = 0; i < subjectArray.length; i++) {
                    subjectArray[i] = subjectArray[i].replace(/-/g, " - ");
                }

                subjectArray.length = subjectArray.length - 4;
                //console.log(subjectArray);
                console.log("Exam.JS:".bold + " Successfully Got `subjectArray`".green);
                //callback(subjectArray); //Future Callback
            }
        });
    };

    function cleanArray(actual) {
        var newArray = new Array();
        for (var i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    }
    //self.examBoardCIE(); //Temporary Use for Testing
    console.log("Exam.JS:".bold + " Successfully Defined `examBoardCIE`".green);
};

module.exports = examBoardModule;