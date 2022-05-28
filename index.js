const db = require("./config/connection");
const inq = require("inquirer");
const cTable = require("console.table");
const q = require("./helpers/queries");
const { mainLoopQS, rolesQS, empQS } = require("./helpers/questions");

// NOTES:
// queries are referenced by q.queryName.  they're stored in the q variable
// arrays of questions for inquirer are destructured above and modified
// depending on if a question should be displayed.  you'll see below

//capitalize first letter of string
function cap() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// add to string prototype so all strings get it now
String.prototype.cap = cap;

// main menu recursive loop
async function init() {
  // show main menu and get their choice
  let { choice } = await inq.prompt(mainLoopQS);

  // figure out which option they chose
  switch (choice) {
    // view all departments
    case "viewDeps":
      //get departments
      let deps = await db.query(q.getDeps);

      // if there are departments, show in table else display message
      deps[0]?.length > 0
        ? console.table(deps[0])
        : console.log("No departments to show");

      // wait a second and a half before looping into the main menu again
      setTimeout(init, 1500);
      break;

    // all cases starting with view have the same structure as "vewDeps"
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

    //---------------------------------------------------------------//

    case "addDept":
      // theres only one question for departments so we handle it differently
      let { newDept } = await inq.prompt([
        { name: "newDept", message: "What is the department name?" },
      ]);

      // use prepared statement from q and add new department (capitalized) as param
      let res = await db.query(q.addDept, [newDept.cap()]);

      // display message depending on how things went
      console.log(
        res?.length > 0
          ? `Added new department "${newDept}" into db`
          : `Err: Could not add "${newDept}" into db`
      );

      // wait a second and a half and ask user whats next
      setTimeout(init, 1500);
      break;

    // all cases starting with "add" have the same structure as "addRole"
    // with some caveats
    case "addRole":
      // get departments so we can let them choose one
      let departments = await db.query(q.getDeps).then((deps) => deps[0]);

      // turn departments into choices for inquirer
      rolesQS[2].choices = departments.map((dep) => {
        return { name: dep.department_name, value: dep.id };
      });

      // get the options they chose
      let { title, salary, department_id } = await inq.prompt(rolesQS);

      // add role to db using prepared statement
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
      //get employees and roles to add as choices
      let employees = await db.query(q.getEmps).then((data) => data[0]);
      let roles2 = await db.query(q.getRoles).then((roles) => roles[0]);

      // dont let them add an employee if there are no roles yet to assign them to
      if (roles2?.length < 1) {
        return console.log(
          "You must add a role before adding your first employee."
        );
      }

      // make a copy of empQS so we can remove
      let empQS2 = empQS;

      // turn roles into choices
      empQS2[2].choices = roles2.map((role) => {
        return { name: role.title, value: role.id };
      });

      // turn employees into choices.  also add their role so
      // user can pick a manager
      empQS2[3].choices = employees.map((emp) => {
        let { first_name, last_name, role_id } = emp;
        return {
          name: `${first_name} ${last_name} ${
            role_id === 1 ? "[Manager]" : "[Employee]"
          }`,
          value: emp.id,
        };
      });

      // dont let them even pick a manager if there arent any employees yet
      if (employees?.length === 0) empQS2 = empQS2.slice(0, 3);

      // get answers from user. by default role and manager are null
      let {
        fName,
        lName,
        role_id = null,
        manager_id = null,
      } = await inq.prompt(empQS2);

      // add employee to db and capitalize their name when storing
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
