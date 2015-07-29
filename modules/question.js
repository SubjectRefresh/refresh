var colors = require("colors");
var utf8 = require('utf8');
var request = require('sync-request');
console.log("Question.JS:".bold + " Successfully Imported Required Packages".blue);

var questionModule = function () {
    var self = this;

    self.covert = function (inputString, callback) {
        var output = [];


        var res = request('POST', 'https://api.textrazor.com', {
            body: "apiKey=c0dbc052930dce78cc1dd1b37b3d3a4fb3f609c251c4f7e34a3b452a&text=" + utf8.encode(inputString) + "&extractors=" + utf8.encode("entities")
        });
        var data = JSON.parse(res.getBody().toString('utf8'));

        console.log(data);
        callback(output);
    }
}
console.log("Convert.JS:".bold + " Successfully Defined `convert`".blue);
};

module.exports = questionModule;
