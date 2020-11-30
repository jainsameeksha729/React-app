const express = require("express");

const controller = require("../../controller/student.controller");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.route("/id/:studentId").get(controller.getStudent);
router.route("/byCollege/:collegeId").get(controller.getStudentByCollegeId);

module.exports = router;