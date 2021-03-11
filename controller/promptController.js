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
    
        console.log(modeChoice);

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
                console.log("hi");
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
};