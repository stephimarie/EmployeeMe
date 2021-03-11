const inquirer = require("inquirer");
// const connection = require("../db/connection");

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
                console.log("hi");
                break;
            case "View Roles":
                console.log("hi");
                break;
            case "View Employees":
                console.log("hi");
                break;
            case "View Department":
                this.viewDepartments();
                break;
            case "Edit Employee Role":
                console.log("hi");
                break;    
        
            default:
                console.log("bye");
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
        console.log("success!!!");
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

        console.log("Success!!");
        this.mainMenu();
    },

    // NOTE: Logic for viewing department, employee and role
    viewDepartments: async function () {
        const department = await connection.query("SELECT * FROM department");
        
        console.table(departments.map((department) => {
            return { id: department.id, department: department.name };
        })
        
        );

        this.mainMenu();
    },
};