const db = require("./config/connection");
const inq = require("inquirer");

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

inq.prompt(questions).then((answers) => {
  console.log(answers);
});
