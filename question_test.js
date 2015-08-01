var utf8 = require('utf8');
var request = require('sync-request');
var colors = require("colors");

function question(inputArray, callback) {

    var output = [];
    var outputFinal = [];
    var sentence = inputArray.join(" ");
    var entityPositions = [];
    var res = request('POST', 'https://api.textrazor.com', {
        body: "apiKey=c0dbc052930dce78cc1dd1b37b3d3a4fb3f609c251c4f7e34a3b452a&text=" + utf8.encode(sentence) + "&extractors=" + utf8.encode("entities")
    });
    //console.log(res.getBody().toString('utf8'));
    var data = JSON.parse(res.getBody().toString('utf8'));
    for (i = 0; i < data.response.entities.length; i++) {
        entityPositions.push([data.response.entities[i].matchedText, data.response.entities[i].startingPos, data.response.entities[i].endingPos]);
    }
    output = [entityPositions, sentence];

    callback(output);
}


question(["This is a sentetce about atoms.", "Atoms are very small particles"], function (outputs) {
    console.log(outputs);
});
