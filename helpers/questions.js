const db = require("../config/connection");
const inq = require("inquirer");

const mainLoopQS = [
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      // { name: "View Departments", value: "viewDeps" },
      // { name: "View Roles", value: "viewRoles" },
      // { name: "View Employees", value: "viewEmps" },
      // new inq.Separator(),
      { name: "Add Department", value: "addDept" },
      { name: "Add Role", value: "addRole" },
      { name: "Add Employee", value: "addEmp" },
      new inq.Separator(),
      { name: "Quit", value: "quit" },
    ],
  },
];

const rolesQS = [
  { name: "title", message: "Title" },
  { name: "salary", message: "Salary" },
  {
    type: "list",
    name: "department_id",
    message: "Department?",
  },
];

module.exports = { rolesQS, mainLoopQS };
