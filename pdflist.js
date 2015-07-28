var request = require("request");
var cheerio = require("cheerio");
var colors = require ("colors");
console.log("PDFList.js: ".bold + " Successfully Imported Required Packages".green);


Array.prototype.last = function() {
    return this[this.length - 1];
}
console.log("PDFList.js: ".bold + " Successfully Declared `last`".green);


function collectURL(number, callback) { // returns an array of the links and numbers for each syllabus
  // PLEASE PASS <number> AS A STRING!
    var link = [];
    var newArray = [];
    console.log("PDFList.js: ".bold + " Successfully Defined Global Variables".green);
    request("http://www.cie.org.uk/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/subjects/", function(error, response, body) {
        if (!error && response.statusCode == 200){
              console.log("PDFList.js: ".bold + " Successfully Requested Website".green);
              $ = cheerio.load(body);
              $(".emphasized-link").find("li").each(function() { // loop through each link
                  var selector = $(this).find("a").attr("href");
                  newArray.push({
                    "dom_object": $(this),
                    "number": selector.split("-").last().replace("/",""), // number
                    "link": selector // link
                    });
              });
              console.log("PDFList.js: ".bold + " Successfully Pushed to `newArray`".green);
              for (i=0;i<newArray.length;i++){
                if (String(newArray[i].number) == String(number)){ // we got a match for the subject
                  link = newArray[i].link;
                  request("http://www.cie.org.uk/" + newArray[i].dom_object.find("a").attr("href"), function(error2, response2, body2){
                    $new = cheerio.load(body2);
                    $new(".binaryLink").find("a").each(function(){
                      var PDFLink = $new(this).attr("href");
                      console.log("PDFList.js: ".bold + $new(this).text().red + " has a link of " + PDFLink.red);
                    });
                 });
                }
              }
          newArray.splice(newArray.length-7, 7);
        }
        console.log("PDFList.js: ".bold + " Successfully Completed `collectURL`".green);
        if (callback !== undefined) {
          callback(link);
        }
    });
}

var number = "0600";
collectURL(number,function(link){
  console.log("PDFList.js: ".bold + "The link for " + number.red + " is " + link.red);
});

console.log("PDFList.js: ".bold + " Successfully Declared `collectURL`".green);