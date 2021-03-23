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
          
      case "View All Departments":
        viewDepartments();
          break;
  
      case "Add Department":
        addDepartment();
          break;

      case "Remove Department":
        removeDepartment();
          break;
       
      case "Exit":
        connection.end();
          break;
    }
  });
};
// Function that validates the user's input is valid and is not blank
function validateInput(input) {
  if (input.trim() == "") {
    console.log("\x1b[31m", "Please answer the question to proceed.");
  } else {
    return true;
  }
}
function validateSalary(input) {
  if (input.trim() == "") {
    console.log("\x1b[31m", "Please answer the question to proceed.");
  } else if (isNaN(input)) {
    console.log(
      "\x1b[31m",
      "Input must be a numeric value, for example: 50000"
    );
  } else {
    return true;
  }
}
// Function that formats a user's input with title case and trimming blank spaces
function formatInput(str) {
  str = str.toLowerCase().trim().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}
// Function that formats a user's input with title case while typing
function titleCase(str) {
  str = str.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}
// View all employees in the "employee" table
const viewEmployees = () => {
  const query =
    "SELECT emp.id AS ID, CONCAT(emp.first_name, ' ', emp.last_name) AS Name, r.title AS Title, d.name AS Department, CONCAT('$', FORMAT(r.salary, 2)) AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employee emp INNER JOIN  role r ON emp.role_id=r.id INNER JOIN  department d ON r.department_id=d.id LEFT JOIN  employee m ON emp.manager_id = m.id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("\x1b[35m", res);
    runSearch();
  });
};
// Add a employee to the "employee" table
const addEmployee = () => {
  inquirer
  .prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter the employee's first name:",
      validate: validateInput,
      transformer: titleCase,
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter the employee's last name:",
      validate: validateInput,
      transformer: titleCase,
    },

  ])
  .then((answers) => {
    connection.query(
      "SELECT id AS value, title AS name FROM role ORDER BY title ASC",
      (err, res) => {
        if (err) throw err;
        let array = JSON.parse(JSON.stringify(res));

        inquirer
        .prompt({
          name: "role",
          type: "list",
          message: "Choose a role for the new employee",
          choices: array,
        })
        .then((answer1) => {
          connection.query(
            "SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee ORDER BY name ASC",
            (err, res) => {
              if (err) throw err;
              let array2 = JSON.parse(JSON.stringify(res));

              array2.unshift({ value: "No Manager", name: "No Manager" });

            }

          );

        });

      }

    );

  });

};

