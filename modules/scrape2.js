var pdf = require("pdftohtmljs");
var fs = require("fs");
var cheerio = require("cheerio");
var natural = require("natural");

parseHTML = function(number) {
    fs.readFile('../temporary/CIE' + number + ".html", 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
        $ = cheerio.load(data);
        var blarg = $("body").text();
        console.log(blarg);


    });
}

parseHTML("0600");