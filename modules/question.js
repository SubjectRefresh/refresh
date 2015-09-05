/////////////////////////////////////////////////////////////////////////
//
//I/O Details:
//
//I - Array of arrays of sentences to process
//O - Array of gaps in the gap fill: [[[[Entity, StartPos, EndPos],[Entity, StartPos, EndPos]],sentence],[[[Entity, StartPos, EndPos],[Entity, StartPos, EndPos]],sentence]]
//
/////////////////////////////////////////////////////////////////////////

var colors = require("colors");
var utf8 = require('utf8');
var request = require('sync-request');

colors.setTheme({
    title: ['white', 'italic'],
    error: ['bgRed', 'white', 'bold'],
    info: ['bgYellow', 'white', 'italic'],
    success: ['bgGreen', 'white'],
});

//console.log("Question.JS:".bold + " Successfully Imported Required Packages".blue);

var questionModule = function () {
    var self = this;

    self.question = function (inputArray, callback) {
        var output = [];
        var outputFinal = [];
        var sentence = inputArray.join(" ");
        var entityPositions = [];
        var res = request('POST', 'https://api.textrazor.com', {
            body: "apiKey=c0dbc052930dce78cc1dd1b37b3d3a4fb3f609c251c4f7e34a3b452a&text=" + encodeURIComponent(utf8.encode(sentence)) + "&extractors=" + utf8.encode("entities")
        });
        //console.log(res.getBody().toString('utf8'));
        
        var data = JSON.parse(res.getBody().toString('utf8'));
        
        console.log(data);
        for (i = 0; i < data.response.entities.length; i++) {
            entityPositions.push([data.response.entities[i].matchedText, data.response.entities[i].startingPos, data.response.entities[i].endingPos]);
        }
        output = [entityPositions, sentence];
        
        output2 = JSON.stringify(output);

        callback(output2);
    }
};
//callback = [[[[Entity, StartPos, EndPos], [Entity, StartPos, EndPos]], sentence], [[[Entity, StartPos, EndPos], [Entity, StartPos, EndPos]], sentence]]
//console.log("Convert.JS:".bold + " Successfully Defined question.JS".blue);

module.exports = questionModule;
