const mysqul = require("mysql");
const util = require("util");

const connection = mysqul.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "loveJet7",
    database: "employee_tracker",
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;

// 00:34:32 stop video