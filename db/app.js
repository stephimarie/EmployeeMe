const figlet = require("figlet");
const start = require("../controller/promptController");

// Shows the Employee Tracker in Terminal
figlet("Employee Tracker", async (err, transformed) => {
    if (err) throw err;
    console.log(transformed);
    await start.mainMenu();
});