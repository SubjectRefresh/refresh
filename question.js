var utf8 = require('utf8');
var request = require("request");
var colors = require("colors");
console.log("Question.JS:".bold + " Successfully Imported Required Packages".green);

var questionModule = function () {
    var self = this;

    self.question = function (inputArray, callback) {

        var root = "";
        var question = "";
        var outputContentWrapper = [];
        var output = []

        var arrayLength = inputArray.length;
        console.log("Question got to loading the array");

        for (var i = 0; i < arrayLength; i++) {

            var sentence = inputArray[i]


            for (c = 0; c < sentence.length; c++) {

                if (sentence[c] == " ") {

                    var root = sentence.slice(c + 1, sentence.length)
                    var keyword = sentence.slice(0, c);
                    break;

                }

            }
            var options = {
                url: 'https://api.textrazor.com/',
                'method': 'POST',
                'body': {
                    "apiKey": "c0dbc052930dce78cc1dd1b37b3d3a4fb3f609c251c4f7e34a3b452a",
                    "text": utf8.encode(sentence),
                    "extractors": "words"
                }

            };

            request(options, function (error, response, body) {
                console.log("TextRazer reply :: " + JSON.parse(body));
            });
        }

    };

};

console.log("Question.JS:".bold + " Successfully finished question".green);
module.exports = questionModule;
