const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("emp_skills_db", "root", "prasanth123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();

module.exports = sequelize;
