const Sequelize = require("sequelize");
const { DB_USER, DB_PASSWORD } = process.env;
const mysql = require("mysql2");

const dbName = "employees";

function init() {
  try {
    mysql.createConnection({
      host: "localhost",
      user: DB_USER,
      password: DB_PASSWORD,
      database: "employees",
    });
  } catch (err) {
    console.log(err);
  }
}

init();

let db = new Sequelize("employees", DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = db;
