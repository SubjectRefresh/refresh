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
        fs.readFile("../files/" + examBoard + examSubject + examSyllabus + ".html", 'utf8', function(err, data) {
            if (err) throw err;
            console.log("Success!");
            $ = cheerio.load(data);
            var bulletpointsplit = $("body").text();
            // console.log(bulletpointsplit);

            bulletpointsplit = bulletpointsplit.split("•");
            //console.log(bulletpointsplit);

            var temparray = bulletpointsplit;

            for (i = 0; i < bulletpointsplit.length; i++) {
                if (bulletpointsplit[i].indexOf("State the distinguishing properties of solids") > -1) {
                    console.log(bulletpointsplit[i]);
                    break;
                } else {
                    console.log("Shifted!");
                    temparray.shift()
                }
            }

            console.log(temparray);
            var bulletpointsplit2 = [];
            bulletpointsplit2 = temparray;

            for (i = temparray.length; i > 0; i=i-1) {
                if (temparray[i].indexOf("different units and/or different linkages") > -1) {
                    console.log(temparray[i]);
                    break;
                } else {
                    console.log("Popped!");
                    temparray.pop()
                }
            }

            callback(temparray);
        });
    };
    
    self.convertPDF = function(examBoard, examSubject, examSyllabus, url, callback) {
        request(url, function(err, res, body) {
            var fileName = String(examBoard + examSubject + examSyllabus.replace("/", "-"));
            console.log(examSyllabus);
            fileName = fileName.replace("/", "-");
            console.log(fileName);
            fileName = fileName.substring(0, fileName.length - 4);
            fs.writeFile(path.join(__dirname, ("../files/" + fileName + ".pdf")), body, function(err) {
                if (err) throw err;
                var converter = new pdf(path.join(__dirname, ("files/" + fileName + ".pdf"), path.join(__dirname, ("files/" + fileName + ".html"))));
                converter.convert();
                converter.success(function() {
                    callback();
                });
            });
        });
    };
}

module.exports = parseHTML;
