const { Sequelize, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Department extends Model {}

Department.init(
  {
    name: Sequelize.STRING,
  },
  {
    modelName: "deparment",
    sequelize,
    underscored: true,
  }
);

module.exports = Department;
