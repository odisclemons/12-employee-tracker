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
      console.log(
        res?.length > 0
          ? `Added new department "${newDept}" into db`
          : `Err: Could not add "${newDept}" into db`
      );
      setTimeout(init, 1500);
      break;
    case "addRole":
      let departments = await db.query(q.viewDeps).then((deps) => deps[0]);
      rolesQS[2].choices = departments.map((dep) => {
        return { name: dep.department_name, value: dep.id };
      });

      let { title, salary, department_id } = await inq.prompt(rolesQS);

      let roleRes = await db.query(q.addRole, [title, salary, department_id]);
      console.log(
        roleRes?.length > 0
          ? `Added new department "${newRole.title}" into db`
          : `Err: Could not add "${newRole.title}" into db`
      );
      setTimeout(init, 1500);
      break;
    case "addEmp":
      let { newEmp } = await inq.prompt(q.empQS);
      setTimeout(init, 1500);
      break;
    case "quit":
      console.log("Peace!");
      process.exit();
      break;
  }
}

init();
