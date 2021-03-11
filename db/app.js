const figlet = require("figlet");
const inquirer = require("inquirer");

// Shows the Employee Tracker in Terminal
figlet("Employee Tracker", async (err, transformed) => {
    if (err) throw err;
    console.log(transformed);
    
    const { menuChoice } = await inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        name: "menuChoice",
        choices: ["this", "that"],
    });

    console.log(menuChoice);
});