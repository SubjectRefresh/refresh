var mysql = require('mysql');
var crypto = require('crypto');
var connection = mysql.createConnection({
    host: '185.38.45.194',
    user: 'hexcompu_ref',
    password: 'AWDRGY123123',
    database: 'hexcompu_refresh'
});
connection.connect();
console.log('Server Login')

function AddUser(fName, lName, eMail, pass, uName) {
    var salt = crypto.randomBytes(128).toString('base64');
    crypto.pbkdf2(pass, salt, 10000, 512, function(err, derivedKey) {
        pass = derivedKey;


        connection.query('INSERT INTO UserData SET FirstName=?, LastName=?, Email=?, Hash=?, UserName=?, Salt=?', [fName, lName, eMail, pass, uName, salt], function(err, rows, fields) {
            if (err) throw err;

        });
    });
}

function login(eMail, pass) {
    connection.query('SELECT Salt,Hash FROM UserData WHERE Email=?', [eMail], function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        var salt = rows[0]['Salt'];
        var hash = rows[0]['Hash'];
        var both = pass + salt;
        console.log(rows[0]['Salt'])
        console.log(both)
        console.log(hash + salt)
        if (both == hash + salt) {
            console.log('SUCCESSFUL LOGIN')
        }
        connection.query('SELECT UID FROM UserData WHERE Email=? and Hash=? ', [eMail, pass], function(err, rows, fields) {
            if (err) console.log(err);

        });
    });




}
var mysql = require('mysql');
var crypto = require('crypto');
var connection = mysql.createConnection({
    host: '185.38.45.194',
    user: 'hexcompu_ref',
    password: 'AWDRGY123123',
    database: 'hexcompu_refresh'
});
connection.connect();
console.log('Server Login')

function AddUser(fName, lName, eMail, pass, uName) {
    var salt = crypto.randomBytes(128).toString('base64');
    crypto.pbkdf2(pass, salt, 10000, 512, function(err, derivedKey) {
        pass = derivedKey;


        connection.query('INSERT INTO UserData SET FirstName=?, LastName=?, Email=?, Hash=?, UserName=?, Salt=?', [fName, lName, eMail, pass, uName, salt], function(err, rows, fields) {
            if (err) throw err;

        });
    });
}

function login(eMail, pass) {
    connection.query('SELECT Salt,Hash FROM UserData WHERE Email=?', [eMail], function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        var salt = rows[0]['Salt'];
        var hash = rows[0]['Hash'];
        var both = pass + salt;
        console.log(rows[0]['Salt'])
        console.log(both)
        console.log(hash + salt)
        if (both == hash + salt) {
            console.log('SUCCESSFUL LOGIN')
        }
        connection.query('SELECT UID FROM UserData WHERE Email=? and Hash=? ', [eMail, pass], function(err, rows, fields) {
            if (err) throw err;

        });
    });
}
login('jim', 'dave')