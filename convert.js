var myStringArray = ["State the distinguishing properties of solids, liquids and gases", "Describe the structure of solids, liquids and gases in terms of particle separation, arrangement and types of motion", "Describe changes of state in terms of melting, boiling, evaporation, freezing, condensation and sublimation", "Describe qualitatively the pressure and temperature of a gas in terms of the motion of its particles", "Show an understanding of the random motion of particles in a suspension (sometimes known as Brownian motion) as evidence for the kinetic particle (atoms, molecules or ions) model of matter", "Describe and explain diffusion"];



function convert(inputArray) {
    var arrayLength = inputArray.length;
    for (var i = 0; i < arrayLength; i++) {
        //console.log("Current working sentence: " + inputArray[i]);
        var sentence = inputArray[i]
        for (c = 0; c < sentence.length; c++) {
            //console.log(sentence[c]);
            if (sentence[c] == " ") {
                var root = sentence.slice(c + 1, sentence.length)
                break;
            }
        }
        console.log(root);
    }
}
convert(myStringArray);
