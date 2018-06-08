var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"",
  database:"mysql"
});

console.log('SQL Connected');

module.exports = con;
