var pdf = require("pdftohtmljs");
var fs = require("fs");
var cheerio = require("cheerio");
var natural = require("natural");
var colors = require("colors");

colors.setTheme({
  title: ['white', 'italic'],
  error: ['bgRed', 'white', 'bold'],
  info: ['bgYellow', 'white', 'italic'],
  success: ['bgGreen', 'white'],
});

var parseHTML = function(number) {
    var self = this;
    
    self.scrape = function() {
        fs.readFile('files/CIE' + number + ".html", 'utf8', function(err, data) {
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

            console.log(temparray);
        });
    };
}

module.exports = parseHTML;
