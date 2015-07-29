var request = require("request");
var cheerio = require("cheerio");
var colors = require("colors");
var fs = require("fs");
var baseURL = "http://www.cie.org.uk";

/* from pdflist.js */
Array.prototype.last = function() {
    return this[this.length - 1];
}

function collectURLs(number, convert, callback) { // returns an array of the links and numbers for each syllabus
    // PLEASE PASS <number> AS A STRING!
    var newArray = [];
    var links = {
        syllabus: null,
        pdfs: []
    };
    console.log("PDFList.js: ".bold + "Successfully Defined Global Variables".green);
    request("http://www.cie.org.uk/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/subjects/", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("PDFList.js: ".bold + "Successfully Requested Website For List of Subjects".green);
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
                        console.log("PDFList.js: ".bold + "Successfully Requested Website For List Of PDFs".green);
                        $new = cheerio.load(body2);
                        $new(".binaryLink").find("a").each(function() {
                            var PDFLink = $new(this).attr("href");
                            links.pdfs.push(PDFLink); // is working
                            //    console.log("PDFList.js: ".bold + $new(this).text().blue + " => " + baseURL.green + PDFLink.green);
                        });
                        //console.log("PDFList.js: ".bold + "Got ".green + String(links.pdfs.length).blue + " PDFs".green);
                    });
                }
            }
            console.log("collectURLs has finished".red);
            if (convert) {
                doPDFConversions(links, function(html) { // insert pdf conversion function here and return HTML to the callback
                    if (callback !== undefined) {
                        callback(html);
                    }
                });
            }
        }
    });
}

/* end from pdflist.js */

function doPDFConversions(urls, callback) {
    console.log("starting doPDFConversions".green);
    var status = [false, "creation of html from pdf failed"];
    var urls_glob;
    urls_glob = urls;
    if (urls.pdfs.length != 0) {
        // this is getting run BEFORE collectURLs has finished and therefore urls is empty
        console.log("PDFList.js: ".bold + "collectURLs() gave us: ".green + String(urls.pdfs.length - 1).blue + " PDFs".green);
    } else {
        console.log("PDFList.js: ".bold + "collectURLs gave us: ".red + String(urls.pdfs.length).blue + " PDFs".red);
    }
    for (i = 0; i < urls.pdfs.length - 1; i++) {
        request(urls.pdfs[i], function(err, res, body) { // grab the PDF from the url
            fs.writeFile("html.html", body, function(err) {
                if (err) {
                    status = [false, err]
                }
            });
            var pdftohtml = require('pdftohtmljs'),
                converter = new pdftohtml("./html.html", "./sample.html"); // make a PDF object

            converter.preset('default');

            converter.success(function() {
                console.log("Conversion done");
                status = [true, "ok"];
            });

            converter.error(function(error) {
                console.log("Conversion error: " + error);
                status = [false, error];
            });

            converter.progress(function(ret) {
                console.log((ret.current * 100.0) / ret.total + " %");
            });

            converter.convert();
        });
    }
    console.log("doPDFConversions has finished".red);
    if (callback !== undefined) {
        callback(status, "<html><img src='images/cat.png' alt='Cat'></html>");
    }
}

collectURLs("0600", true, function(status, urls) {
    console.log("collectURLs has finished");
});