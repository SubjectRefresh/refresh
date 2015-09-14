var mysql = require("mysql");
var connection = mysql.createConnection({
    host: '185.38.45.194',
    user: 'hexcompu_ref',
    password: 'AWDRGY123123',
    database: 'hexcompu_refresh'
});

module.exports = {
    kissOfLife: function(callback) {
        connection = mysql.createConnection({
            host: '185.38.45.194',
            user: 'hexcompu_ref',
            password: 'AWDRGY123123',
            database: 'hexcompu_refresh'
        });

        connection.connect(function(err) {
            if (err) {
                console.log('error when connecting to db:', err);
                setTimeout(function() { module.exports.kissOfLife(); }, 2000);
            }
        });

        connection.on("error", function(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                module.exports.kissOfLife();
            } else {
                console.log(err);
                throw err;
            }
        });
    },

    addToCachingServer: function() {
        connection.query("");
    }
};
