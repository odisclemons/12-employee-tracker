const Sequelize = require("sequelize");
const { DB_USER, DB_PASSWORD } = process.env;

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: DB_USER,
  password: DB_PASSWORD,
  database: "employees",
});

connection.query("SELECT * FROM `table`", function (err, results) {
  console.log(err, results); // results contains rows returned by server
});

module.exports = new Sequelize("employees", DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});
