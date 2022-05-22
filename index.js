const inq = require("inquirer");
const db = require("./config/connection");

async function init() {
  try {
    await db.authenticate();
    console.log("Connected to db.");
  } catch (err) {
    console.error("Failed to connect to db:", err);
  }
}

init();
