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
      { name: "Add Department", value: "addDept" },
      { name: "Add Role", value: "addRole" },
      { name: "Add Employee", value: "addEmp" },
    ],
  },
];

inq.prompt(questions).then(async (answers) => {
  console.log(q.getDeps);
  let deps = await db.query(q.getDeps);
  console.log(deps[0]);
  process.exit();
});
