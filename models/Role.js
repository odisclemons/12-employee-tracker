const Sequelize = require("sequelize");
const db = require("../config/connection");

const Role = db.define({
  title: Sequelize.STRING,
});

module.exports = Role;
