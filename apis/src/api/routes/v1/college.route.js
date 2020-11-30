const express = require("express");

const controller = require("../../controller/college.controller");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.route("/id/:collegeId").get(controller.getCollegeById);
router.route("/all").get(controller.getAllColleges);
router.route("/state").get(controller.getCollegesByState);
router.route("/course").get(controller.getCollegesByCourses);
router.route("/similar").get(controller.getSimilarColleges);

module.exports = router;