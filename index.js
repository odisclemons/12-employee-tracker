const db = require("./config/connection");
const inq = require("inquirer");
const cTable = require("console.table");
const q = require("./helpers/queries");
const { mainLoopQS, rolesQS } = require("./helpers/questions");

async function init() {
  let { choice } = await inq.prompt(mainLoopQS);
  console.log(choice);
  switch (choice) {
    case "viewDeps":
      let deps = await db.query(q.viewDeps);
      console.table(deps[0]);
      //console.log(deps[0]);
      setTimeout(init, 1500);
      break;
    case "viewRoles":
      let roles = await db.query(q.viewRoles);
      console.table(roles[0]);
      setTimeout(init, 1500);
      break;
    case "viewEmps":
      let emps = await db.query(q.viewEmps);
      console.table(emps);
      setTimeout(init, 1500);
      break;
    case "addDept":
      let { newDept } = await inq.prompt([
        { name: "newDept", message: "What is the department name?" },
      ]);
      let res = await db.query(q.addDept, [newDept]);
      break;
    case "addRole":
      let departments = await db.query(q.viewDeps).then((deps) => deps[0]);
      rolesQS[2].choices = departments.map((dep) => {
        return { name: dep.department_name, value: dep.id };
      });

      let newRole = await inq.prompt(rolesQS);
      console.log(newRole);
      break;
    case "addEmp":
      let { newEmp } = await inq.prompt([
        { name: "newDept", message: "What is the employee name?" },
      ]);
      break;
    case "quit":
      console.log("Peace!");
      process.exit();
      break;
  }
}

init();
