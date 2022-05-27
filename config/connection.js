const { DB_USER, DB_PASSWORD } = process.env;
const mysql = require("mysql2");

const dbName = "employees";
var db = mysql.createConnection(
  {
    host: "localhost",
    user: DB_USER,
    password: DB_PASSWORD,
    database: "employee_tracker",
  },
  console.log(`Connected to "${dbName}" db.`)
);

module.exports = db.promise();
