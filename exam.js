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

function examBoardCie(callback) {
    request('http://www.cie.org.uk/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/subjects/', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);

            data = $('.emphasized-link').text();
            data = data.replace(/ +?|\r/g, '').split("\n");
            data = cleanArray(data);

            subjectArray = [];

            for (i = 0; i < data.length; i++) {
                if (data[i] != "New" && data[i] != "Live") {
                    subjectArray.push(data[i]);
                }
            }

            for (i = 0; i < 4; i++) {
                subjectArray.pop();
            }

            for (i = 0; i < subjectArray.length; i++) {
            	subjectArray[i] = subjectArray[i].replace(/-/g, " - ");
            }

            callback(subjectArray);
            console.log(subjectArray);
        }
    })
<<<<<<< Updated upstream
}
=======
}

//checkExamBoard("cie");
>>>>>>> Stashed changes
