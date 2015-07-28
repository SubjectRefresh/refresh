var request = require("request");
var cheerio = require("cheerio");

function log(string){
  console.log(string);
}

Array.prototype.last = function() {
    return this[this.length - 1];
}

function collectURL(number, callback) { // returns an array of the links and numbers for each syllabus
    var link = [];
  	var newArray = [];
    request('http://www.cie.org.uk/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/subjects/', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);

            data = $.html();

            $(".emphasized-link").find("li").find("a").each(function() { // loop through each link
                var selector = $(this).attr("href");
                newArray.push(
                  selector.split("-").last().replace("/",""), // number
                   selector // link  
                   );
            });
          for (i=0;i<newArray.length-1;i++){
            	if (newArray[i][0] == number){
                link = newArray[i][1];
              }
          }
          
          newArray.splice(newArray.length-7, 7);
          }
      log(newArray);
      if (callback != undefined) {
      	callback(link);
      }
    });
}



collectURL(0600);