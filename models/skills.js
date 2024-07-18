const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConnection");

const Skills = sequelize.define(
  "Skill",

  {
    emp_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    experience: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    level: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    domain: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Skill",
    tableName: "skills_table",
    timestamps: false,
  }
);
sequelize
  .sync()
  .then(() => {
    console.log("Skill table has been synced");
  })
  .catch((error) => {
    console.error("Unable to sync the Skill table:", error);
  });

module.exports = Skills;
