const mysqul = require("mysql");

const connection = mysqul.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "loveJet7",
    database: "employee_tracker",
});

connection.connect();

module.exports = connection;