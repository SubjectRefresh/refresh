var mysql = require('mysql');
var crypto = require('crypto');
var connection = mysql.createConnection({
    host: '185.38.45.194',
    user: 'hexcompu_ref',
    password: 'AWDRGY123123',
    database: 'hexcompu_refresh'
});

connection.connect();

var databaseModule = function() {
    var self = this;
    
    self.addUser = function(fn, ln, em, psswd, usrnm, callback) {
        var salt = crypto.randomBytes(128).toString('base64');
        crypto.pbkdf2(psswd, salt, 10000, 512, function (err, derivedKey) {
            psswd = derivedKey;
            connection.query('INSERT INTO UserData SET FirstName=?, LastName=?, Email=?, Hash=?, UserName=?, Salt=?', [fn, ln, em, psswd, usrnm, salt], function (err, rows, fields) {
                if (err) throw err;
                callback(true);
            });
        });
    };
    
    self.login = function(em, psswd, callback) {
        connection.query('SELECT Salt,Hash FROM UserData WHERE Email=?', [em], function (err, rows, fields) {
            var salt = rows[0]['Salt'];
            crypto.pbkdf2(psswd, salt, 10000, 512, function (err, derivedKey) {
                psswd = derivedKey;
                if (err) throw err;
                console.log(rows);

                var hash = rows[0]['Hash'];
                var both = psswd + salt;
                console.log(rows[0]['Salt'])
                console.log(both)
                console.log(hash + salt)
                if (both == psswd) {
                    console.log('SUCCESSFUL LOGIN')
                };

                connection.query('SELECT UID FROM UserData WHERE Email=? and Hash=? ', [em, psswd], function (err, rows, fields) {
                    if (err) throw err;
                    
                });
            });
        });
    };
};

module.exports = databaseModule;