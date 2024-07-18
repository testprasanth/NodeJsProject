const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const Employee = sequelize.define(
  "employee",
  {
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    emp_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    blood_group: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },

    phone_number: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "employee_table",
    timestamps: false, // If you do not have createdAt and updatedAt columns
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci",
  }
);

// Sync the model with the database (creates the table if it doesn't exist)
sequelize
  .sync()
  .then(() => {
    console.log("Employee table has been synced");
  })
  .catch((error) => {
    console.error("Unable to sync the employee table:", error);
  });

module.exports = Employee;
