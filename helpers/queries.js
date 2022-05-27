const db = require("../config/connection");

const queries = {
  viewDeps: "SELECT * FROM departments",
  viewRoles: "SELECT * FROM roles",
  viewEmps: "SELECT * FROM employees",
  addDept: "INSERT INTO departments (department_name) VALUES (?)",
  addRole: "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
  addEmp: "INSERT INTO departments (department_name) VALUES (?)",
};

module.exports = queries;
