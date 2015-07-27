var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');


console.info("Request has been loaded");

if (typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
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
            data = data.replace(/ +?/g, '');
            data = data.replace("/\r", '');
            data = data.split("\n");
            console.log(data);
            fs.writeFile("tmp", data, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.info("The file was saved!");
            });
        }
    })
}

checkExamBoard("cie");