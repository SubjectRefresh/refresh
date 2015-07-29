var colors = require("colors");
console.log("Convert.JS:".bold + " Successfully Imported Required Packages".green);


var myStringArray = ["State the distinguishing properties of solids, liquids and gases", "State which parts of YRS are the best", "Describe the structure of solids, liquids and gases in terms of particle separation, arrangement and types of motion", "Describe changes of state in terms of melting, boiling, evaporation, freezing, condensation and sublimation", "Describe qualitatively the pressure and temperature of a gas in terms of the motion of its particles", "Show an understanding of the random motion of particles in a suspension (sometimes known as Brownian motion) as evidence for the kinetic particle (atoms, molecules or ions) model of matter", "Describe and explain diffusion"];

var convertModule = function () {
    var self = this;

    self.covert = function (inputArray, callback) {

        var output = ["properties of solids", "State"];
        callback(output);
    }

    console.log("Convert.JS:".bold + " Successfully Defined `convert`".green);
};

module.exports = convertModule;
