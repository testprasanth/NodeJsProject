const { body } = require("express-validator");
const router = require("express").Router();

const {
  getEmployees,
  addEmployees,
  updateEmployee,
  login,
} = require("../controllers/employeeController");

const {
  getSkills,
  addSkills,
  updateSkills,
  // login,
} = require("../controllers/skillController");

//=====================================================//

router.get("/getEmployees", getEmployees);

//http://localhost:3000/api/getEmployees

router.post(
  "/addEmployees",
  [
    body("emp_name").optional().trim(),
    body("position").optional().notEmpty().trim(),
    body("domain").optional().notEmpty().trim(),
    body("password").optional().notEmpty().trim(),
    body("phone_number").optional().notEmpty().trim(),
    body("blood_group").optional().notEmpty().trim(),
  ],
  addEmployees
);

// http://localhost:3000/api/addEmployee

// {

//   "emp_name": "rajesh",
//   "position": "Durpal Developer",
//   "domain": "PHP"
//"password": "1234"
// }

router.put(
  "/updateEmployee",
  [
    body("emp_id").optional().trim(),
    body("emp_name").optional().trim(),
    body("position").optional().notEmpty().trim(),
    body("domain").optional().notEmpty().trim(),
    body("phone_number").optional().notEmpty().trim(),
  ],
  updateEmployee
);

//http://localhost:3000/api/updateEmployee
// {
//   "emp_id": 1,
//   "emp_name": "prasanth",
//   "position": "software Developer",
//   "domain": "java(java8)"
// }

router.post(
  "/login",
  [
    body("emp_name").optional().trim(),
    body("password").optional().notEmpty().trim(),
  ],
  login
);

router.get("/getSkills", getSkills);

router.post(
  "/addSkills",
  [
    body("name").optional().trim(),
    body("skills").optional().notEmpty().trim(),
    body("experience").optional().notEmpty().trim(),
    body("level").optional().notEmpty().trim(),
    body("domain").optional().notEmpty().trim(),
  ],
  addSkills
);

router.put(
  "/updateSkills",
  [
    body("emp_id").optional().trim(),
    body("name").optional().trim(),
    body("skills").optional().notEmpty().trim(),
    body("experience").optional().notEmpty().trim(),
    body("domain").optional().notEmpty().trim(),
  ],
  updateSkills
);
module.exports = router;
