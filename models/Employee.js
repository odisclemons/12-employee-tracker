const { Sequelize, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Employee extends Model {}

Employee.init(
  {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    role_id: Sequelize.INTEGER,
    manager_id: Sequelize.INTEGER,
  },
  {
    modelName: "employee",
    sequelize,
    underscored: true,
  }
);

module.exports = Employee;
