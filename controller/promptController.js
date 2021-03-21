const inquirer = require("inquirer");
const { listenerCount } = require("../db/connection");
const connection = require("../db/connection");

module.exports ={
    mainMenu: async function() {
        const { modeChoice } = await inquirer.prompt({
            message: "What would you like to do?",
            type: "list",
            name: "menuChoice",
            choices: [
                "Add a Department", 
                "Add a Role", 
                "Add an Employee", 
                "View Roles", 
                "View Employees",
                "View Departments",
                "Edit Employee Role",
                "Exit",
            ],
        });
    

        switch (modeChoice) {
            case "Add a Department":
                this.addDepartment();
                break;
            case "Add a Role":
                this.addRole();
                break;
            case "Add an Employee":
                this.addEmployee();
                break;
            case "View Roles":
                this.viewRoles();
                break;
            case "View Employees":
                this.viewEmployee();
                break;
            case "View Department":
                this.viewDepartments();
                break;
            case "Edit Employee Role":
                this.changeEmployeeRole();
                break;    
        
            default:
                process.exit();
                break;
        }
    },

    // NOTE: Logic for add department, employee and role
    addDepartment: async function () {
        const { name } = await inquirer.prompt({
            type: "text",
            name: "name",
            message: "What is the name of this department?",
        });

        await connection.query("INSERT INTO department SET ?", [{ name }]);
        this.mainMenu();
    },
    
    // NOTE: addRole needs a department id
    addRole: async function () {
        const departments = await connection.query("SELECT * FROM department");

        const { title, salary, department_id } = await inquirer.prompt([
        { type: "text", name: "title", message: "What is the title?" },
        { type: "number", name: "salary", message: "What is the salary?" },
        { 
            type: "list", 
            name: "department_id", 
            message: "What department does this role belong to?",
            choices: departments.map((department) => { 
                return { name: department.name, value: department.id };
            }),
        },
    ]);

        await connection.query("INSERT INTO role SET ?, ?, ?", [
            { title }, 
            { salary }, 
            { department_id },
        ]);

        this.mainMenu();
    },

    addEmployee: async function () {
        const newEmployee = await inquirer.prompt([
            {
                type: "text",
                message: "What is the employees first name?",
                name: "first_name",
            },
            {
                type: "text",
                message: "What is the employees last name?",
                name: "last_name",
            },
        ]);

        const { departments } = await connection.query( "SELECT * FROM department");

        const { department_id } = await inquirer.prompt({
            type: "list",
            name: "department",
            choices: departments.map(department => {
                return {
                    name: department.name,
                    value: department.id,
                };
            }),
        }),


        const roles = await connection.query(
            "SELECT * FROM role WHERE department_id = ?",
            [department_id]
        );


        const {roles_id} = await inquirer.prompt({
            type: "list",
            name: "roles_id",
            message: "Which role?",
            choices: roles.map(role => {
                return{
                    name: role.title,
                    value: role.id,
                };
            }),
        });    

        newEmployee.role_id = role_id;

        const {hasManager} = await inquirer.prompt({
            type: "confirm",
            message: "Does this employee have a manager?",
            name: "hasManager",
        });

        if(!hasManager){
            const res = await connection.query("INSERT INTO employee SET ?", [
                newEmployee
            ]);

        } else {
            const employees = await connection.query("SELECT * FROM employee");
            const employeeData = employees.map(employee => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                };
            });

            const { manager_id } = await inquirer.prompt({
                message: "Who is this employees manager?",
                name: "manager_id",
                type: listenerCount,
                choice: employeeData,
            });

            newEmployee.manager_id = manager_id;

            const res = await connection.query("INSERT INTO employee SET?", [
                newEmployee,
            ]);

            this.mainMenu();
        }
        this.mainMenu();     

        // NOTE: Logic for viewing department, employee and role
        viewDepartments: async function () {
            const department = await connection.query("SELECT * FROM department");
        
            console.table(
                departments.map((department) => {
                return { id: department.id, department: department.name };
                })
            );

            this.mainMenu();
        };

        viewRoles: async function () {
            const roles = await connection.query(
             "SELECT * FROM role LEFT JOIN department ON role.department_id = department.id"
            );

            console.table(roles.map(({ title, salary, name }) => {
                    return {
                        title, 
                        salary,
                        department: name,
                    };
                })
            );

            this.mainMenu();
        }; 

        viewEmployees: async function () {
            const employee = await connection.query(
                `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON manager.id = employee.manager_id;`
            );

                console.table(
                    employee.map(
                        ({ id, first_name, last_name, departments, title, salary, manager }) => {
                            return {
                                id, 
                                first_name, 
                                last_name, 
                                department, 
                                title, 
                                salary, 
                                manager,
                            };
                        }
                    )
                );
                this.mainMenu();
        };

        changeEmployeeRole: async function () {
            const employee = await connection.query(
                "SELECT id, role_id, manager_id, CONCAT(first_name, ' ', last_name) AS name FROM employees"
            );
                
            const { id } = await inquirer.prompt({
                message: "Which employees role are you changing?",
                name: "id",
                choices: employees.map(employee => {
                    return { name: employee.name, value: employee.id };
                }),
            });


            this.mainMenu();
        };
    },
};    