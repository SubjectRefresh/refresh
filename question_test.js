var utf8 = require('utf8');
var request = require('sync-request');
var colors = require("colors");

function question(inputString, callback) {
    var output = "";
    var res = request('POST', 'https://api.textrazor.com', {
        var entityPositions = [];
        var entityPositionsContentWrapper = [];
        body: "apiKey=c0dbc052930dce78cc1dd1b37b3d3a4fb3f609c251c4f7e34a3b452a&text=" + utf8.encode(inputString) + "&extractors=" + utf8.encode("entities")
    });
    var data = JSON.parse(res.getBody().toString('utf8'));

    console.log(res.getBody().toString('utf8'));
    callback(output);
}

question("Atoms are very small objects", function (output) {
    console.log(output);
});
