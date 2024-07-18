const { DataTypes } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sequelize = require("../config/dbConnection");
const Employee = require("../models/employee");
const logger = require("../config/logger"); // Require the logger

// Get Employees
exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();

    if (!employees || employees.length === 0) {
      logger.info("No employees found");
      return res.status(404).json({
        message: "Employees not found",
      });
    }

    logger.info("All Employees Details retrieved successfully");
    res.status(200).json({
      responseCode: 200,
      success: true,
      message: "All Employees Details retrieved successfully",
      data: employees,
    });
  } catch (error) {
    logger.error("Error retrieving data", { error });
    next(error);
  }
};

// Add Employee
exports.addEmployees = async (req, res, next) => {
  const functionName = "addEmployee";

  try {
    const { emp_name, position, domain, password, blood_group, phone_number } =
      req.body;

    // Create a new role record in the database
    const newEmployee = await Employee.create({
      emp_name: emp_name,
      position: position,
      blood_group: blood_group,
      password: password,
      phone_number: phone_number,
      domain: domain,
    });

    logger.info("Employee created successfully", { employee: newEmployee });

    // Send a success response with the created role
    res.status(201).json({
      message: "Employee created successfully",
      newEmployee,
    });
  } catch (error) {
    logger.error("Error creating Employee:", { error });

    res.status(500).json({ message: "Internal server error" });
  }
};

//updateEmployee
exports.updateEmployee = async (req, res, next) => {
  const functionName = "updateEmployee";
  try {
    const { emp_id, emp_name, position, Blood_grop, phone_number } = req.body;

    const employee = await Employee.findOne({ where: { emp_id: emp_id } });
    if (!employee) {
      logger.error(`${functionName}: Employee not found for empid ${emp_id}`);
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.update({ emp_name, position, Blood_grop, phone_number });

    logger.info(
      `${functionName}: Employee with empid ${emp_id} updated successfully`
    );
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    logger.error(`${functionName}: Error updating employee`, { error });
    res.status(500).json({ message: "Internal server error" });
  }
};

//==============================================================//
// exports.login = async (req, res, next) => {
//   const functionName = "login";

//   try {
//     const { emp_name, password } = req.body;

//     // Find the employee by their name
//     const employee = await Employee.findOne({ where: { emp_name } });

//     if (!employee) {
//       logger.error("Employee not found");
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     // Check if the provided password matches the stored password
//     if (password !== employee.password) {
//       logger.error("Invalid password");
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     logger.info("Login successful", { employee: employee });

//     // Send the token in the response
//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     logger.error("Error logging in:", { error });
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
exports.login = async (req, res, next) => {
  const functionName = "login";

  try {
    const { emp_name, password } = req.body;

    // Find the employee by their name
    const employee = await Employee.findOne({ where: { emp_name } });

    if (!employee) {
      logger.error("Employee not found");
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if the provided password matches the stored password
    if (password !== employee.password) {
      logger.error("Invalid password");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    logger.info("Login successful", { employee: employee });

    // Send the token and employee details in the response
    res.status(200).json({
      emp_Id: employee.emp_id,
      emp_Name: employee.emp_name,
      emp_Position: employee.position,
      Blood_grop: employee.Blood_grop,
      phone_number: employee.phone_number,
    });
  } catch (error) {
    logger.error("Error logging in:", { error });
    res.status(500).json({ message: "Internal server error" });
  }
};
