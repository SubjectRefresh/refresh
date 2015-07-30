var utf8 = require('utf8');
var request = require('sync-request');
var colors = require("colors");

function question(inputString, callback) {
    var sentence = inputString.join(" ");
    var output = "";
    var entityPositions = [];
    var entityPositionsContentWrapper = [];
    var res = request('POST', 'https://api.textrazor.com', {
        body: "apiKey=c0dbc052930dce78cc1dd1b37b3d3a4fb3f609c251c4f7e34a3b452a&text=" + utf8.encode(inputString) + "&extractors=" + utf8.encode("entities")
    });
    console.log(res.getBody().toString('utf8'));
    var data = JSON.parse(res.getBody().toString('utf8'));
    for (i = 0; i < data.response.entities.length; i++) {
        entityPositions.push([data.response.entities[i].matchedText, data.response.entities[i].startingPos, data.response.entities[i].endingPos]);
    }
    console.log(entityPositions);
    callback(output);
}

question("Solid is one of the four fundamental states of matter ). It is characterized by structural rigidity and resistance to changes of shape or volume. Unlike a liquid , a solid object does not flow to take on the shape of its container , nor does it expand to fill the entire volume available to it like a gas does. The atoms in a solid are tightly bound to each other , either in a regular geometric lattice ) or irregularly )", function (output) {
    console.log(output);
});
