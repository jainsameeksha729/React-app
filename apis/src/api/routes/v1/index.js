const express = require('express');
// const bootstrapRoutes = require('./bootstrap.route');
const collegeRoute = require("./college.route");
const studentRoute = require("./student.route")
const router = express.Router();

/**
 * @swagger
 * /status:
 *  get:
 *    tags:
 *      - Status
 *    summary: Server health status
 *    responses:
 *        200:
 *          description: A successful response
 */
router.get('/status', (req, res) => res.send('OK'));

router.use("/college", collegeRoute);
router.use("/student", studentRoute);

// router.use("/search", searchRoute);

module.exports = router;
