const Student = require("../models/student.model");

const logger = require("../services/logger.service");
const APIError = require("../utils/APIError");
const { MSG } = require("../utils/messages");
const handleResponse = require("../utils/handleResponse");
let { perPage } = require("../../config/vars");

exports.getStudent = async (req, res, next) => {
  try {
    let { studentId } = req.params;

    let student = await Student.find({ _id: studentId });

    const result = {
      result: student,
    };
    handleResponse.success(res, result, 200);
  } catch (error) {
    logger.error(MSG.NO_STUDENT_FOUND, error);
    handleResponse.error(
      res,
      new APIError({
        message: MSG.NO_STUDENT_FOUND,
        errors: error,
        status: 400,
      })
    );
  }
};

exports.getStudentByCollegeId = async (req, res, next) => {
    try {
      let { collegeId } = req.params;
      let page = req.query.page || 1;
  
      page = isNaN(page) ? 1 : parseInt(page);
      page = page <= 0 ? 1 : page;
      const skipPerPage = perPage * (page - 1);
      const total = await Student.count({ collegeId: collegeId });
  
      let students = await Student.find({ collegeId: collegeId })
      .skip(skipPerPage)
      .limit(parseInt(perPage))
      .sort({ createdAt: -1 })
      .lean();;
  
  
      const result = {
        page: page,
        perPage: perPage,
        total: total,
        students: students,
      };
  
      handleResponse.success(res, result, 200);
    } catch (error) {
      logger.error(MSG.STUDENT_NOT_FOUND, error);
      handleResponse.error(
        res,
        new APIError({
          message: MSG.STUDENT_NOT_FOUND,
          errors: error,
          status: 400,
        })
      );
    }
  };
  