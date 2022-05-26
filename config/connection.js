const { DB_USER, DB_PASSWORD } = process.env;
const mysql = require("mysql2");

const dbName = "employees";

module.exports = mysql.createConnection(
  {
    host: "localhost",
    user: DB_USER,
    password: DB_PASSWORD,
    database: "employees",
  },
  console.log(`Connected to "${dbName}" db.`)
);
