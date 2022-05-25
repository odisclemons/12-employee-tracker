const inq = require("inquirer");
const db = require("./config/connection");
const Department = require("./models/Department");
const Role = require("./models/Role");
const Employee = require("./models/Employee");

async function init() {
  try {
    await db.authenticate();
    console.log("Connected to db.");
  } catch (err) {
    console.error("Failed to connect to db:", err);
  }

  //db.sync();
}

init();
