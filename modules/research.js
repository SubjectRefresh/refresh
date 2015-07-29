var request = require('request');
var cheerio = require('cheerio');
var bing = require('node-bing-api')({ accKey: "InGGbJ6KRh/VpRJgiQLn1dwXms5Od8n8k9KGbTBdjb4" });
var fs = require('fs');
var natural = require("natural");
var tokenizer = new natural.TreebankWordTokenizer();
var nounInflector = new natural.NounInflector();

var researchModule = function() {
    var self = this;
    
    self.researchTopic = function(topic, commandWord, callback) {
        var topicWordsSplit = topic.split(" ");
        console.log("Research.JS:".bold + " Searching Bing".blue);
        bing.web(topic, {top:3, skip:0}, function(err, res, body) {
            console.log("Research.JS:".bold + " Received Bing Search Results".blue);
            var URL = []
            URL.push(body.d.results[0].Url);
            URL.push(body.d.results[1].Url);
            URL.push(body.d.results[2].Url);
            
            var output = "";
            var count = 0;
            for (var i = 0; i < 3; i++) {
                console.log("Research.JS:".bold + (" Requesting Webpage, " + URL[i]).blue);
                request(URL[i], function(err, res, body) {
                    console.log("Research.JS:".bold + " Received Webpage!".blue);
                    output += body;
                    count += 1;
                    if (count == 3) {
                        var $ = cheerio.load(output);
                        var text = $("p").text();
                        var sentenceArray = text.split(".");
                        var usefulSentences = [];
                        for (var i = 0; i < sentenceArray.length; i++) {
                            var workingSentence = [];
                            var tokenizedText = tokenizer.tokenize(sentenceArray[i]);
                            var clause = 0;
                            for (w in tokenizedText) {
                                var usefulSentence = false;
                                var pOSBuffer = "";
                                if (tokenizedText[w] == "(") {clause += 1;}
                                else if (tokenizedText[w] == ")") {clause -= 1;}
                                for (k in topicWordsSplit) {
                                    
                                }
                                if (w == tokenizedText.length - 1) {
                                    usefulSentences.push(workingSentence);
                                }
                            }
                            console.log(workingSentence);
                        }
                        
                        callback(usefulSentences);
                    }
                });
            }
        });
    };
}

module.exports = researchModule;
