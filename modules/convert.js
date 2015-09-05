/////////////////////////////////////////////////////////////////////////
//
//I/O Details:
//
//I - Array of sentences to process
//O - Array of searchable terms as strings
//
/////////////////////////////////////////////////////////////////////////
var utf8 = require('utf8');
var request = require('sync-request');
var colors = require("colors");

colors.setTheme({
    title: ['white', 'italic'],
    error: ['bgRed', 'white', 'bold'],
    info: ['bgYellow', 'white', 'italic'],
    success: ['bgGreen', 'white'],
});

//console.log("Convert.JS:".title + " Successfully Imported Required Packages".success);

var convertModule = function () {
    var self = this;

    self.convert = function (inputArray, callback) {
//        console.log("Convert.JS".title + ": convert()".info);
        var root = "";
        var question = "";
        var outputContentWrapper = [];
        var output = []
        var arrayLength = inputArray.length;
        //console.log("Convert.JS: ".title + "got to loading the array".success);

        for (var i = 0; i < arrayLength; i++) {
            var sentence = inputArray[i]

            for (c = 0; c < sentence.length; c++) {

                if (sentence[c] == " ") {

                    var root = sentence.slice(c + 1, sentence.length)
                    var keyword = sentence.slice(0, c);
                    break;

                }

            }
            var res = request('POST', 'https://api.textrazor.com', {
                body: "apiKey=c0dbc052930dce78cc1dd1b37b3d3a4fb3f609c251c4f7e34a3b452a&text=" + utf8.encode(sentence) + "&extractors=" + utf8.encode("entities,dependency-trees")
            });
            var data = JSON.parse(res.getBody().toString('utf8'));
            //console.log(res.getBody().toString('utf8'));
//            console.log("Convert.JS:".title + " Successfully attempted communication with TextRazor".success);
            var entities = data.response.entities;
            if (entities != undefined) {
                for (g = 0; g < entities.length; g++) {
                    //console.log(entities[g].entityEnglishId);
                    if (entities[g].entityEnglishId != "") {
                        var isAlreadyIn = output.indexOf("GCSE " + entities[g].entityEnglishId)
                        //console.log("=====" + isAlreadyIn + "=====");
                        if (isAlreadyIn == -1) {
                            for (j = 0; j < data.response.sentences[0].words.length; j++) {
                                if (data.response.sentences[0].words[j].parentPosition == undefined) {
                                    //console.log(data.response.sentences[0].words[j].token);
                                    output.push(data.response.sentences[0].words[j].token + " " + entities[g].entityEnglishId + " GCSE");
                                }
                            }

                        }
                    }
                }
            }
        }
        callback(output);
    }

    //console.log("Convert.JS:".title + " Successfully Defined `convert`".success);
};

module.exports = convertModule;