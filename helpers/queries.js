const db = require("../config/connection");

const queries = {
  getDeps: "SELECT * FROM departments",
  getRoles: "SELECT * FROM roles",
  getEmps: "SELECT * FROM employees",
  addDept: "INSERT INTO departments (department_name) VALUES (?)",
  addRole: "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
  addEmp:
    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
};

module.exports = queries;

/*
INNER JOIN departments
ON roles.department_id = departments.id
*/
