var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var colors = require('colors');

colors.setTheme({
  title: ['white', 'italic'],
  error: ['bgRed', 'white', 'bold'],
  info: ['bgYellow', 'white', 'italic'],
  success: ['bgGreen', 'white'],
});

var examBoardModule = function() {
    var self = this;
    
    Array.prototype.last = function() {
        return this[this.length - 1];
    }
    
    String.prototype.trim = function() {  
        return this.replace(/^\s+|\s+$/g,"");  
    }  

    self.collectURLs = function(number, callback) {
        // Number Parameter Must be a String
        var newArray = [];
        var links = {
            syllabus: null,
            pdfs: []
        };
        var baseURL = "http://www.cie.org.uk"
//        console.log("Exam.js: ".bold + "Successfully Defined Global Variables".green);
        request("http://www.cie.org.uk/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/subjects/", function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Exam.js: ".bold + "Got list of subjects".green);
                $ = cheerio.load(body);
                $(".emphasized-link").find("li").each(function() { // loop through each link
                    var selector = $(this).find("a").attr("href");
                    newArray.push({
                        "dom_object": $(this), // this is so we can access it later
                        "number": selector.split("-").last().replace("/", ""), // number
                        "link": baseURL + selector // link
                    });
                });
                for (i = 0; i < newArray.length; i++) {
                    if (String(newArray[i].number) == String(number)) { // we got a match for the subject
                        links.syllabus = newArray[i].link;
                        request(baseURL + newArray[i].dom_object.find("a").attr("href"), function(error2, response2, body2) {
                            console.log("Exam.js: ".bold + "Got list of PDFs".green);
                            $new = cheerio.load(body2);
                            
                            $new(".binaryLink").find("a").each(function(i, elem) {
                                var PDFLink = $new(this).attr("href");
                                var PDFName = $new(this).text().replace("\n", "").trim();
                                var PDFName = PDFName.split("(")[0].trim();
                                links.pdfs.push([PDFLink, PDFName]);
                                if (i == $new(".binaryLink").find("a").length - 1) {
                                    callback(links.pdfs);
                                }
//                                console.log("collectURLs has finished".green);
                                
                                // is working
                                //    console.log("Exam.js: ".bold + $new(this).text().blue + " => " + baseURL.green + PDFLink.green);
                            });
                            //console.log("Exam.js: ".bold + "Got ".green + String(links.pdfs.length).blue + " PDFs".green);
                        });
                    }
                }
            }
        });
    };
};

module.exports = examBoardModule;