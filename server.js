const inquirer = require("inquirer");
const mysql = require("mysql");
const console_table = require("console.table");



const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_tracker",
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  runSearch();
  console.log('connected as id ' + connection.threadId);
});
const runSearch = () => {
  inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "What would like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update An Employee's Role",
      "Remove Employee",
      "View All Roles",
      "Add Role",
      "Remove Role",
      "View All Departments",
      "Add Department",
      "Remove Department",
      "Exit",
    ]
  })
  .then((answer) => {
    switch (answer.action) {
      case "View All Employees";
        viewEmployees();
          break;

      case "Add Employee":
        addEmployee();
          break;
          
      case "Update An Employee's Role":
        updateEmployeeRole();
          break;

      case "Remove Employee":
        removeEmployee();
          break;

      case "View All Roles":
        viewRoles();
          break;

      case "Add Role":
        addRole();
          break;

      case "Remove Role":
        removeRole();
          break;

  
    }
  });
};