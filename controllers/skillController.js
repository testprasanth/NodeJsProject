const { DataTypes } = require("sequelize");
const { validationResult } = require("express-validator");

const sequelize = require("../config/dbConnection");
const Skills = require("../models/skills");
const logger = require("../config/logger"); // Require the logger

// exports.login = async (req, res, next) => {
//   const functionName = "login";

//   try {
//     const { emp_name, password } = req.body;

//     // Find the employee by their name
//     const employee = await Skills.findOne({ where: { emp_name } });

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

//     // Send the token and employee details in the response
//     res.status(200).json({
//       emp_Id: employee.emp_id,
//       emp_Name: employee.emp_name,
//       emp_Position: employee.position,
//       Blood_grop: employee.Blood_grop,
//       phone_number: employee.phone_number,
//     });
//   } catch (error) {
//     logger.error("Error logging in:", { error });
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.getSkills = async (req, res, next) => {
  try {
    const listSkills = await Skills.findAll();

    if (!listSkills || listSkills.length === 0) {
      logger.info("No skillsdata found");
      return res.status(404).json({
        message: "SkillsData not found",
      });
    }

    logger.info("All skillsdata Details retrieved successfully");
    res.status(200).json({
      responseCode: 200,
      success: true,
      message: "All skillsdata Details retrieved successfully",
      data: listSkills,
    });
  } catch (error) {
    logger.error("Error retrieving data", { error });
    next(error);
  }
};
//=========================================================//

exports.addSkills = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, skills, experience, level, domain } = req.body;
    const skill = await Skills.create({
      name,
      skills,
      experience,
      level,
      domain,
    });
    res.status(200).json({
      responseCode: 200,
      success: true,
      message: "Skills added successfully",
      data: skill,
    });
  } catch (error) {
    logger.error("Error adding data", { error });
    next(error);
  }
};

exports.updateSkills = async (req, res, next) => {
  const functionName = "updateSkills";
  try {
    const errors = validationResult(req);
    const { name, skills, experience, domain, emp_id } = req.body;
    const skill = await Skills.findOne({ where: { emp_id: emp_id } });

    if (!skill) {
      logger.error(`${functionName}: Skill not found for empid ${emp_id}`);
      return res.status(404).json({ message: "Skill not found" });
    }

    await skill.update({ name, skills, experience, domain });

    logger.info(
      `${functionName}: Skill with empid ${emp_id} updated successfully`
    );
    res.status(200).json({ message: "Skills updated successfully" });
  } catch (error) {
    logger.error(`${functionName}: Error updating Skills`, { error });
    res.status(500).json({ message: "Internal server error" });
  }
};
