var request = require("request");
var cheerio = require("cheerio");

function log(string){
  console.log(string);
}

Array.prototype.last = function() {
    return this[this.length - 1];
}

function collectURL(number, callback) { // returns an array of the links and numbers for each syllabus
  // PLEASE PASS number AS A STRING!
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
        log(link);
        if (callback !== undefined) {
          callback(link);
        }
    });
}

// collectURL("0413");