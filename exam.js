var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');


console.info("Request, Cheerio and FS have been loaded");

function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

function examBoardCie(callback) {
    request('http://www.cie.org.uk/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/subjects/', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);

            data = cleanArray($('.emphasized-link').text().replace(/ +?|\r/g, '').split("\n"));
            subjectArray = [];

            for (i = 0; i < data.length; i++) {
                if (data[i] != "New" && data[i] != "Live") {
                    subjectArray.push(data[i]);
                }
                subjectArray[i] = subjectArray[i].replace(/-/g, " - ");
            }

            subjectArray.length = subjectArray.length - 4;
            callback(subjectArray);
            console.log("Completed Exam.JS");
        }
    })
}