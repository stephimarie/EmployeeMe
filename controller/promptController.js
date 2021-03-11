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
                console.log("hi");
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
                console.log("byee");
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
       
    // NOTE: Logic for viewing department, employee and role
    viewDepartments: async function () {
        const department = await connection.query("SELECT * FROM department");
        
        const departmentData = departments.map(department => {
            return { id: department.id, name: department.name };
        });
        console.table(departmentData);

        this.mainMenu();
    },
};