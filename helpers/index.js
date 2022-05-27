const db = require("../config/connection");

const queries = {
  getDeps: "SELECT * FROM departments",
  getRoles: "SELECT * FROM roles",
  getEmps: "SELECT * FROM employees",
};

module.exports = queries;
