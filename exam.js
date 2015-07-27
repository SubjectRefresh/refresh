var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');


console.info("Request has been loaded");

function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

function checkExamBoard(examBoard) {
    if (examBoard == "cie") {
        examBoardCie();
    }
}

function examBoardCie() {
    request('http://www.cie.org.uk/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/subjects/', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) 
            $ = cheerio.load(body);

            data = $('.emphasized-link').text();
            data = data.replace(/ +?|\r/g, '').split("\n");
            data = cleanArray(data);

            for (i = 0; i < data.length; i++) {
                if (data[i] == "New" || "Live") {
                	data[i] = "";
                }
            }

            //data = cleanArray(data);

            console.log(data);
        }
    })
}

checkExamBoard("cie");