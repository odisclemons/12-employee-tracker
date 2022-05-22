const Sequelize = require("sequelize");
const db = require("../config/connection");

const Department = db.define({
  name: Sequelize.STRING,
});

module.exports = Department;
