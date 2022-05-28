const db = require("./config/connection");
const inq = require("inquirer");
const cTable = require("console.table");
const q = require("./helpers/queries");
const { mainLoopQS, rolesQS, empQS } = require("./helpers/questions");

//capitalize first letter of string
// add to string prototype so all strings get it now
function cap() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.cap = cap;

async function init() {
  let { choice } = await inq.prompt(mainLoopQS);
  console.log(choice);
  switch (choice) {
    case "viewDeps":
      let deps = await db.query(q.getDeps);
      deps[0]?.length > 0
        ? console.table(deps[0])
        : console.log("No departments to show");
      setTimeout(init, 1500);
      break;
    case "viewRoles":
      let roles = await db.query(q.getRoles);

      roles[0]?.length > 0
        ? console.table(roles[0])
        : console.log("No roles to show");
      setTimeout(init, 1500);
      break;
    case "viewEmps":
      let emps = await db.query(q.getEmps);

      emps[0]?.length > 0
        ? console.table(emps[0])
        : console.log("No employees to show");
      setTimeout(init, 1500);
      break;
    case "addDept":
      let { newDept } = await inq.prompt([
        { name: "newDept", message: "What is the department name?" },
      ]);
      let res = await db.query(q.addDept, [newDept.cap()]);
      console.log(
        res?.length > 0
          ? `Added new department "${newDept}" into db`
          : `Err: Could not add "${newDept}" into db`
      );
      setTimeout(init, 1500);
      break;
    case "addRole":
      let departments = await db.query(q.getDeps).then((deps) => deps[0]);
      rolesQS[2].choices = departments.map((dep) => {
        return { name: dep.department_name, value: dep.id };
      });

      let { title, salary, department_id } = await inq.prompt(rolesQS);

      let roleRes = await db.query(q.addRole, [
        title.cap(),
        salary,
        department_id,
      ]);

      console.log(
        roleRes?.length > 0
          ? `Added new department "${title}" into db`
          : `Err: Could not add "${title}" into db`
      );
      setTimeout(init, 1500);
      break;
    case "addEmp":
      let employees = await db.query(q.getEmps).then((emp) => emp[0]);
      let roles2 = await db.query(q.getRoles).then((roles) => roles[0]);
      if (roles2?.length < 1) {
        return console.log(
          "You must add a role before adding your first employee."
        );
      }
      let empQS2 = empQS;

      empQS2[2].choices = roles2.map((role) => {
        return { name: role.title, value: role.id };
      });

      empQS2[3].choices = employees.map((emp) => {
        let { first_name, last_name, role_id } = emp;
        return {
          name: `${first_name} ${last_name} ${
            role_id === 1 ? "[Manager]" : "[Employee]"
          }`,
          value: emp.id,
        };
      });

      if (employees?.length === 0) empQS2 = empQS2.slice(0, 3);

      let {
        fName,
        lName,
        role_id = null,
        manager_id = null,
      } = await inq.prompt(empQS2);

      let newEmp = await db.query(q.addEmp, [
        fName.cap(),
        lName.cap(),
        role_id,
        manager_id,
      ]);
      console.log(
        newEmp?.length > 0
          ? `Added new employee "${fName.cap()} ${lName.cap()}" into db`
          : `Err: Could not add "${fName.cap()}" into db`
      );
      setTimeout(init, 1500);
      break;
    case "quit":
      console.log("Peace!");
      process.exit();
      break;
  }
}

init();
