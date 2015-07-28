var pdflist = require("./pdflist.js");
var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

/* from pdflist.js */
function collectURL(number, callback) { // returns an array of the links and numbers for each syllabus
  // PLEASE PASS <number> AS A STRING!
    var link = [];
    var newArray = [];
    request('http://www.cie.org.uk/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/subjects/', function(error, response, body) {
        if (!error && response.statusCode == 200){
              $ = cheerio.load(body);
              $(".emphasized-link").find("li").find("a").each(function() { // loop through each link
                  var selector = $(this).attr("href");
                  newArray.push({
                    "number": selector.split("-").last().replace("/",""), // number
                    "link": selector // link
                    });
              });
              for (i=0;i<newArray.length;i++){
                if (String(newArray[i].number) == String(number)){
                  link = newArray[i].link;
                }
              }
          newArray.splice(newArray.length-7, 7);
        }
        if (callback !== undefined) {
          callback(link);
        }
    });
}

function doPDFConversion() {
	collectURL("0600", function(pdf_url){ // grab the url for the based on number
		console.log(pdf_url);
		
		request(pdf_url, function(err, res, body){ // grab the PDF from the url
			fs.writeFile("html.html",body,function(err){
				if (err){
					throw err;
				}
			});
			var pdftohtml = require('pdftohtmljs'), converter = new pdftohtml("./html.html", "./sample.html"); // make a PDF object

			converter.preset('default');

			converter.success(function() {
				console.log("Conversion done");
			});

			converter.error(function(error) {
				console.log("Conversion error: " + error);
			});

			converter.progress(function(ret) {
				console.log((ret.current*100.0)/ret.total + " %");
			});

			converter.convert();
		});
	});
};

doPDFConversion();