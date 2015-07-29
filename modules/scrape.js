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
        fs.readFile('../temporary/CIE' + number + ".html", 'utf8', function(err, data) {
            if (err) {
                throw err;
            }
            console.log("Success!");
            $ = cheerio.load(data);
            var blarg = $("body").text();
            // console.log(blarg);

            blarg = blarg.split("•");
            //console.log(blarg);

            var test = blarg;

            for (i = 0; i < blarg.length; i++) {
                if (blarg[i].indexOf("State the distinguishing properties of solids") > -1) {
                    console.log(blarg[i]);
                    break;
                } else {
                    console.log("Shifted!");
                    test.shift()
                }
            }
            console.log(test);
        });
    }

    self.parseHTML("0600");
};

module.exports = scrapeModule;