var pdf = require("pdftohtmljs");

var scrapeModule = function() {
    var self = this;
    
    self.convertPDFtoHTML = function() {
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
};

module.exports = scrapeModule;