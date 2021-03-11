const inquirer = require("inquirer");

module.exports ={
    mainMenu: async function() {
        const { menuChoice } = await inquirer.prompt({
            message: "What would you like to do?",
            type: "list",
            name: "menuChoice",
            choices: ["this", "that"],
        });
    
        console.log(menuChoice);
    }
}