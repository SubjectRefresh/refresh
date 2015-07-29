var mysql = require('mysql');
var crypto = require('crypto');
//connect to server
var connection = mysql.createConnection({
    host: '185.38.45.194',
    user: 'hexcompu_ref',
    password: 'AWDRGY123123',
    database: 'hexcompu_refresh'
});
<<<<<<< HEAD
<<<<<<< HEAD

connection.connect();
console.log('Server Login');

var SaltLength = 9;

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

function AddUser(fName, lName, eMail, pass, uName) {
    
    salt = generateSalt(SaltLength)
    
    connection.query('INSERT INTO UserData SET FirstName=?, LastName=?, Email=?, Hash=?, UserName=?, Salt=?', [fName, lName, eMail,createHash(pass,salt), uName,salt], function (err, rows, fields) {
        if (err) throw err;
        
        
    });
};
function Login(eMail,pass){
    connection.query('SELECT Hash,Salt FROM UserData WHERE Email=?', [eMail], function (err, rows, fields) {
        if (err) throw err;
        if (validateHash(rows[0]['Hash'],pass,rows[0]['Salt']) == true) {
            console.log('Login Successful');
            }
        else{
            console.log('Login Denied');
        }
        
    });
}
Login('tom@tom.com','pass')
//AddUser('gib','hansome','tom@tom.com','pass','davedave')
=======
=======
>>>>>>> origin/master

connection.connect();

var databaseModule = function() {
    var self = this;
<<<<<<< HEAD
    
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
    
=======
    
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
    
>>>>>>> origin/master
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

<<<<<<< HEAD
module.exports = databaseModule;
>>>>>>> origin/master
=======
module.exports = databaseModule;
>>>>>>> origin/master
