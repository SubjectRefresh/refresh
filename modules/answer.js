var answerModule = function() {
    var self = this;
    
    self.answer = function(input, callback) {
        callback(input);
    };
}

module.exports = answerModule;