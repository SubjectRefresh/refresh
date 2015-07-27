var myStringArray = ["State the distinguishing properties of solids, liquids and gases", "Describe the structure of solids, liquids and gases in terms of particle separation, arrangement and types of motion", "Describe changes of state in terms of melting, boiling, evaporation, freezing, condensation and sublimation", "Describe qualitatively the pressure and temperature of a gas in terms of the motion of its particles", "Show an understanding of the random motion of particles in a suspension (sometimes known as Brownian motion) as evidence for the kinetic particle (atoms, molecules or ions) model of matter", "Describe and explain diffusion"];

var convertModule = function () {
    var self = this;

    self.covert = function (inputArray, callback) {
        var roots = [];
        var arrayLength = inputArray.length;
        for (var i = 0; i < arrayLength; i++) {
            //=====================================================================================
            //Holding sentence

            //console.log("Current working sentence: " + inputArray[i]);
            var sentence = inputArray[i]
            for (c = 0; c < sentence.length; c++) {
                //console.log(sentence[c]);
                if (sentence[c] == " ") {
                    var root = sentence.slice(c + 1, sentence.length)
                    var keyword = sentence.slice(0, c);
                    break;
                }
            }
            console.log("Keyword: " + keyword)
            switch (keyword) {
                case "State":
                    for (d = 0; d < sentence.length; d++) {
                        if (sentence[d] == " ") {
                            var workingWord = sentence.slice(d + 1, sentence.length);
                            for (e = 0; e < workingWord.length; d++) {
                                if (sentence[e] == " ") {
                                    var word = workingWord.slice(0, e);
                                    var placeholder = e
                                    console.log("Word: " + word)
                                }
                            }
                        }
                    }
                    break;
            }
            //console.log(root);
            roots.push(root);

            //====================================================================================           
        }
        callback(roots);
    };
};

module.exports = convertModule;

function convertActual(inputArray, callback) {
    var roots = [];
    var arrayLength = inputArray.length;
    for (var i = 0; i < arrayLength; i++) {
        //=====================================================================================
        //Holding sentence

        //console.log("Current working sentence: " + inputArray[i]);
        var sentence = inputArray[i]
        for (c = 0; c < sentence.length; c++) {
            //console.log(sentence[c]);
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
                console.log(words)
                words.shift();
                console.log("Post shift" + words);
                words.unshift("What", "are");
                words.push("?");
                console.log("QUESTION: " + words.join(" "));
                break;
        }
        //console.log(root);
        roots.push(root);

        //====================================================================================           
    }
    callback(roots);
}
convertActual(myStringArray, function (output) {})
