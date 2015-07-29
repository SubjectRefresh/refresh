var utf8 = require('utf8');
var request = require("request");
var colors = require("colors");
console.log("Question.JS:".bold + " Successfully Imported Required Packages".green);

var questionModule = function () {
    var self = this;

    self.question = function (inputArray, callback) {
        var output = ["properties of solids", "State"];
        callback(output);
    };

};

/* developius added this */
questionModule.question(["random question"], function () {
    var x = null;
}); // I've got no clue how to test the code I added above - help!
/* end of developius additions */

console.log("Question.JS:".bold + " Successfully finished question".green);
module.exports = questionModule;
