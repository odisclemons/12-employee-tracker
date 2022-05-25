const { Sequelize, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Role extends Model {}

Role.init(
  {
    title: Sequelize.STRING,
    salary: Sequelize.FLOAT,
    department_id: Sequelize.INTEGER,
  },
  {
    modelName: "role",
    sequelize,
    underscored: true,
  }
);

module.exports = Role;
