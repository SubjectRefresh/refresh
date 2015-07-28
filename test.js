var myStringArray = ["State the distinguishing properties of solids, liquids and gases", "State which parts of YRS are the best", "Describe the structure of solids, liquids and gases in terms of particle separation, arrangement and types of motion", "Describe changes of state in terms of melting, boiling, evaporation, freezing, condensation and sublimation", "Describe qualitatively the pressure and temperature of a gas in terms of the motion of its particles", "Show an understanding of the random motion of particles in a suspension (sometimes known as Brownian motion) as evidence for the kinetic particle (atoms, molecules or ions) model of matter", "Describe and explain diffusion"];


var utf8 = require('utf8');
var request = require("request");
var colors = require("colors");
var request = require('request');

function test(inputArray, callback) {

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
        request.post({
            url: 'https://api.textrazor.com',
            body: "apiKey=c0dbc052930dce78cc1dd1b37b3d3a4fb3f609c251c4f7e34a3b452a&text=" + utf8.encode(sentence) + "&extractors=phrases%2Cwords"
        }, function (err, response, body) {
            console.log(body);
        });
    }
}
test(myStringArray, function (output) {
    console.log(output);
});
