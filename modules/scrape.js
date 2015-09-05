var pdf = require("pdftohtmljs");
var fs = require("fs");
var cheerio = require("cheerio");
var natural = require("natural");
var colors = require("colors");
var request = require("request");
var path = require("path");

colors.setTheme({
  title: ['white', 'italic'],
  error: ['bgRed', 'white', 'bold'],
  info: ['bgYellow', 'white', 'italic'],
  success: ['bgGreen', 'white'],
});

var parseHTML = function(number) {
    var self = this;
    
    self.scrape = function(examBoard, examSubject, examSyllabus, callback) {
        fs.readFile("files/" + examSubject + ".html", 'utf8', function(err, data) {
            if (err) {console.log(err)};
            $ = cheerio.load(data);
            var bulletpointsplit = $("body").text();
            // console.log(bulletpointsplit);

            bulletpointsplit = bulletpointsplit.split("•");
            //console.log(bulletpointsplit);

            var temparray = bulletpointsplit;

            for (i = 0; i < bulletpointsplit.length; i++) {
                if (bulletpointsplit[i].indexOf("State the distinguishing properties of solids") > -1) {
                    //console.log(bulletpointsplit[i]);
                    break;
                } else {
                    //console.log("Shifted!");
                    temparray.shift()
                }
            }

            //console.log(temparray);

            for (i = temparray.length - 1; i > 0; i=i-1) {
                if (temparray[i].indexOf("different units and/or different linkages") > -1) {
                    //console.log(temparray[i]);
                    break;
                } else {
                    //console.log("Popped!");
                    temparray.pop()
                }
            }

            callback(temparray);
        });
    };
    
    self.convertPDF = function(examBoard, examSubject, examSyllabus, url, callback) {
        var getPDF = request(url).pipe(fs.createWriteStream("files/" + examSubject + ".pdf"));
        getPDF;
        getPDF.on("finish", function() {
            var converter = new pdf("files/" + examSubject + ".pdf", "files/" + examSubject + ".html");
            converter.success(function() {
                callback();
            });
            converter.error(function(err) {
                console.log("Scrape.JS".title + ": " + "Error with PDF converter: ".error + err.error);
            });
            converter.convert(); 
        });
    };
}

module.exports = parseHTML;