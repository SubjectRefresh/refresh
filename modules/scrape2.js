var pdf = require("pdftohtmljs");
var fs = require("fs");
var cheerio = require("cheerio");
var natural = require("natural");

parseHTML = function(number) {
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

		blarg = test;

		for (i = blarg.length; i > 0; i--) {
			if (blarg[i].indexOf("State the distinguishing properties of solids") > -1) {
				console.log(blarg[i]);
				break;
			} else {
				console.log("Shifted!");
				test.pop()
			}
		}
		
		console.log(test);
	});
}

parseHTML("0600");