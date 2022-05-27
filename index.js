const db = require("./config/connection");
const inq = require("inquirer");
const cTable = require("console.table");
const q = require("./helpers");

const questions = [
  {
    type: "list",
    name: "choose",
    message: "What would you like to do?",
    choices: [
      { name: "View Departments", value: "viewDept" },
      { name: "View Roles", value: "viewRole" },
      { name: "View Employees", value: "viewEmp" },
      new inq.Separator(),
      { name: "Add Department", value: "addDept" },
      { name: "Add Role", value: "addRole" },
      { name: "Add Employee", value: "addEmp" },
      new inq.Separator(),
      { name: "Quit", value: "quit" },
    ],
  },
];

async function init() {
  let choice = await inq.prompt(questions);

  switch (choice) {
    case "viewDept":
      break;
    case "viewRole":
      break;
    case "viewEmp":
      break;
    case "addDept":
      break;
    case "addRole":
      break;
    case "addEmp":
      break;
    case "quit":
      console.log("Peace!");
      process.exit();
      break;
  }
}
init();
