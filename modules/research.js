var request = require('request');
var cheerio = require('cheerio');
var bing = require('node-bing-api')({ accKey: "InGGbJ6KRh/VpRJgiQLn1dwXms5Od8n8k9KGbTBdjb4" });
var fs = require('fs');
var natural = require("natural");

var researchModule = function() {
    var self = this;
    
    self.researchTopic = function(topic, commandWord, callback) {
        console.log("Research.JS:".bold + " Searching Bing".green);
        bing.web(topic, {top:3, skip:0}, function(err, res, body) {
            console.log("Research.JS:".bold + " Received Bing Search Results".green);
            var URL = []
            URL.push(body.d.results[0].Url);
            URL.push(body.d.results[1].Url);
            URL.push(body.d.results[2].Url);
            
            var output = "";
            var count = 0;
            for (var i = 0; i < 3; i++) {
                console.log("Research.JS:".bold + (" Requesting Webpage, " + URL[i]).green);
                request(URL[i], function(err, res, body) {
                    console.log("Research.JS:".bold + " Received Webpage!".green);
                    $ = cheerio.load(body);
                    var bodyText = $("p").text();
                    output += bodyText;
                    count += 1;
                    if (count == 3) {
                        callback(output);
                    }
                });
            }
        });
    };
}

module.exports = researchModule;
