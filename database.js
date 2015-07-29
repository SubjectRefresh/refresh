var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '185.38.45.194',
    user: 'hexcompu_ref',
    password: 'AWDRGY123123',
    database: 'hexcompu_refresh'
});
connection.connect();
console.log('successfull logon')
function AddUser(fName,lName,eMail,pass){
    connection.query('INSERT INTO UserData SET FirstName=?, LastName=?, Email=?, Password=?', [fName,lName,eMail,pass], function(err,rows,fields){
        if(err) throw err;
        
    });
}

