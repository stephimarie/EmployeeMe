const figlet = require("figlet");


// Shows the Employee Tracker in Terminal
figlet("Employee Tracker", async (err, transformed) => {
    if (err) throw err;
    console.log(transformed);
    
    
});