var request = require('request');
var cheerio = require('cheerio');

var researchModule = function() {
    var self = this;
    
    self.researchTopic = function(topic, commandWord) {
        var topicURL = ("https://www.google.co.uk/webhp?hl=en#hl=en&q=" + topic.replace(" ", "+"));
        request(topicURL, function(err, res, body) {
            if (!err && res.statusCode == 200) {
                console.log(body);
            }
        });
    };
}