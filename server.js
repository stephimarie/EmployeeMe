const inquirer = require("inquirer");
const mysql = require("mysql");
const console_table = require("console.table");



const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ex',
  database :  ''
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
