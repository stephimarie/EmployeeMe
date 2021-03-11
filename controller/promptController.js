const inquirer = require("inquirer");

module.exports ={
    mainMenu: async function() {
        const { modeChoice } = await inquirer.prompt({
            message: "What would you like to do?",
            type: "list",
            name: "menuChoice",
            choices: ["Add a Department", "that"],
        });
    
        console.log(modeChoice);
    }
}