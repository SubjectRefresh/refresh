var myStringArray = ["State the distinguishing properties of solids, liquids and gases", "State which parts of YRS are the best", "Describe the structure of solids, liquids and gases in terms of particle separation, arrangement and types of motion", "Describe changes of state in terms of melting, boiling, evaporation, freezing, condensation and sublimation", "Describe qualitatively the pressure and temperature of a gas in terms of the motion of its particles", "Show an understanding of the random motion of particles in a suspension (sometimes known as Brownian motion) as evidence for the kinetic particle (atoms, molecules or ions) model of matter", "Describe and explain diffusion"];

var convertModule = function () {
    var self = this;

    self.covert = function (inputArray, callback) {

        var root = "";
        var question = "";
        var outputContentWrapper = [];
        var output = []

        var arrayLength = inputArray.length;

        for (var i = 0; i < arrayLength; i++) {

            var sentence = inputArray[i]

            for (c = 0; c < sentence.length; c++) {

                if (sentence[c] == " ") {

                    var root = sentence.slice(c + 1, sentence.length)
                    var keyword = sentence.slice(0, c);
                    break;

                }

            }
            console.log("Keyword:--" + keyword + "--");

            switch (keyword) {

                case "State":

                    console.log("Switch for State");
                    var words = sentence.split(" ");
                    words.shift();
                    root = words;
                    words.unshift("What", "are");
                    words.push("?");
                    console.log("QUESTION: " + words.join(" "));
                    question = words.join(" ")
                    outputContentWrapper.push(root);
                    outputContentWrapper.push(question);
                    output.push(outputContentWrapper);
                    break;

            }

        }

        callback(output);

    };
    
    self.convertActual = function(inputArray, callback) {
        var root = "";
        var question = "";
        var outputContentWrapper = [];
        var output = []

        var arrayLength = inputArray.length;

        for (var i = 0; i < arrayLength; i++) {

            var sentence = inputArray[i]

            for (c = 0; c < sentence.length; c++) {

                if (sentence[c] == " ") {

                    var root = sentence.slice(c + 1, sentence.length)
                    var keyword = sentence.slice(0, c);
                    break;

                }

            }
            console.log("Keyword:--" + keyword + "--");

            switch (keyword) {

                case "State":

                    console.log("Switch for State");
                    var words = sentence.split(" ");
                    words.shift();
                    root = words;
                    words.unshift("What", "are");
                    words.push("?");
                    console.log("QUESTION: " + words.join(" "));
                    question = words.join(" ")
                    outputContentWrapper.push(root);
                    outputContentWrapper.push(question);
                    output.push(outputContentWrapper);
                    break;

            }

        }

        callback(output);
    };
};

module.exports = convertModule;