var pdf = require("pdftohtmljs");
var fs = require("fs");
var cheerio = require("cheerio"); 

var scrapeModule = function() {
    var self = this;

    self.convertPDFtoHTML = function(number) {
        var converter = new pdf("temporary/syllabus.pdf", "temporary/sample.html");
        console.log("BLAH!");

        converter.preset("default");

        converter.success(function() {
            console.log("Conversion Done!");
        });

        converter.error(function(err) {
            console.log("Error: " + err);
        });

        converter.convert();
    };

    self.parseHTML = function(number) {
        fs.readFile('./temporary/CIE' + number + ".html", 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
            $ = cheerio.load(body);
            console.log($.text());

        });
    }

    //self.parseHTML("0600");
};

module.exports = scrapeModule;