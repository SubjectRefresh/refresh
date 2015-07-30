/////////////////////////////////////////////////////////////USE OF CODE ///////////////////////////
//Login('tom@tom.com','pass')
//AddUser('gib','hansome','tom@tom.com','pass','davedave')

var mysql = require('mysql');
var crypto = require('crypto');
//connect to server
var connection = mysql.createConnection({
    host: '185.38.45.194',
    user: 'hexcompu_ref',
    password: 'AWDRGY123123',
    database: 'hexcompu_refresh'
});


connection.connect();
console.log('Server Login');

var SaltLength = 9;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var databaseModule = function() {
    var self = this;
    
    function createHash(password,salt) {
    var hash = md5(password + salt);
        return hash;
    }

    function validateHash(hash, password, salt) {

        var validHash = md5(password + salt);
        return hash === validHash;
    }

    function generateSalt(len) {
        var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
            setLen = set.length,
            salt = '';
        for (var i = 0; i < len; i++) {
        var p = Math.floor(Math.random() * setLen);
            salt += set[p];
        }
        return salt;
    }

    function md5(string) {
        return crypto.createHash('md5').update(string).digest('hex');
    }
    
    self.addUser = function(fName, lName, eMail, pass, uName, callback) {
        salt = generateSalt(SaltLength)

        connection.query('INSERT INTO UserData SET FirstName=?, LastName=?, Email=?, Hash=?, UserName=?, Salt=?', [fName, lName, eMail,createHash(pass,salt), uName,salt], function (err, rows, fields) {
            if (err) throw err;
            callback();

        });
    };
    
    self.login = function(eMail,pass){
        connection.query('SELECT Hash,Salt FROM UserData WHERE Email=?', [eMail], function (err, rows, fields) {
            if (err) throw err;
            if (validateHash(rows[0]['Hash'],pass,rows[0]['Salt']) == true) {
                console.log('Login Successful');
                return true;
                }
            else{

                console.log('Login Denied');
                return false;
            }

        });
    };
};

module.exports = databaseModule;