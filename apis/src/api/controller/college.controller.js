const College = require("../models/college.model");
const Student = require("../models/student.model");
const logger = require("../services/logger.service");
const APIError = require("../utils/APIError");
const { MSG } = require("../utils/messages");
const handleResponse = require("../utils/handleResponse");
let { perPage } = require("../../config/vars");

exports.getCollegeById = async (req, res, next) => {
  try {
    let { collegeId } = req.params;

    let college = await College.find({ _id: collegeId });

    const result = {
      college: college,
    };

    handleResponse.success(res, result, 200);
  } catch (error) {
    logger.error(MSG.COLLEGE_NOT_FOUND, error);
    handleResponse.error(
      res,
      new APIError({
        message: MSG.COLLEGE_NOT_FOUND,
        errors: error,
        status: 400,
      })
    );
  }
};

exports.getAllColleges = async (req, res, next) => {
  try {
    // let page = req.query.page || 1;

    // page = isNaN(page) ? 1 : parseInt(page);
    // page = page <= 0 ? 1 : page;
    // const skipPerPage = perPage * (page - 1);
    // const total = await College.count();

    let colleges = await College.find();

    const result = {
      // page: page,
      // perPage: perPage,
      // total: total,
      data: colleges,
    };
    handleResponse.success(res, result, 200);
  } catch (error) {
    logger.error(MSG.NO_COLLEGE_FOUND, error);
    handleResponse.error(
      res,
      new APIError({
        message: MSG.COLLEGE_NOT_FOUND,
        errors: error,
        status: 400,
      })
    );
  }
};

exports.getCollegesByState = async (req, res, next) => {
  try {
    let { state } = req.query;

    let page = req.query.page || 1;

    page = isNaN(page) ? 1 : parseInt(page);
    page = page <= 0 ? 1 : page;
    const skipPerPage = perPage * (page - 1);
    const total = await College.count({ state: state });

    let colleges = await College.find({ state: state });

    const result = {
      page: page,
      perPage: perPage,
      total: total,
      result: colleges,
    };
    handleResponse.success(res, result, 200);
  } catch (error) {
    logger.error(MSG.NO_COLLEGE_FOUND, error);
    handleResponse.error(
      res,
      new APIError({
        message: MSG.COLLEGE_NOT_FOUND,
        errors: error,
        status: 400,
      })
    );
  }
};

exports.getCollegesByCourses = async (req, res, next) => {
  try {
    let { course } = req.query;
    let page = req.query.page || 1;

    page = isNaN(page) ? 1 : parseInt(page);
    page = page <= 0 ? 1 : page;
    const skipPerPage = perPage * (page - 1);
    const total = await College.count({ courses: course });

    let colleges = await College.find({ courses: course });

    const result = {
      page: page,
      perPage: perPage,
      total: total,
      result: colleges,
    };

    handleResponse.success(res, result, 200);
  } catch (error) {
    logger.error(MSG.NO_COLLEGE_FOUND, error);
    handleResponse.error(
      res,
      new APIError({
        message: MSG.COLLEGE_NOT_FOUND,
        errors: error,
        status: 400,
      })
    );
  }
};

exports.getSimilarColleges = async (req, res, next) => {
  try {
    let { state, courses, noOfStudents } = req.query;
    let page = req.query.page || 1;
    noOfStudents = parseInt(noOfStudents)

    page = isNaN(page) ? 1 : parseInt(page);
    page = page <= 0 ? 1 : page;
    const skipPerPage = perPage * (page - 1);
    const total = await College.count({ courses: courses });

    let colleges = await College.find({
      state: state,
      courses: courses,
      noOfStudents: { $gte: noOfStudents - 100, $lt: noOfStudents + 100 },
    });

    const result = {
      page: page,
      perPage: perPage,
      total: total,
      result: colleges,
    };

    handleResponse.success(res, result, 200);
  } catch (error) {
    logger.error(MSG.NO_COLLEGE_FOUND, error);
    handleResponse.error(
      res,
      new APIError({
        message: MSG.COLLEGE_NOT_FOUND,
        errors: error,
        status: 400,
      })
    );
  }
};
