import { apiCalls } from "./apicalls";

// api Url
import {BASE_URL} from "../config/index"


export const getAllCollege = async () => {
  const url = BASE_URL + "/api/v1/college/all";
  try {
    const result = await apiCalls("get", url);
    return result.data;
  } catch (error) {
      console.error("College Error", error.message);
      throw new Error(error.message);
  }
};

export const getCollegeByState = async (state, page = 1) => {
    const url = `${BASE_URL}/api/v1/college/state?page=${page}&state=${state}`;
    try {
      const result = await apiCalls("get", url);
      console.log(result)
      return result.data;
    } catch (error) {
        console.error("College Error", error.message);
        throw new Error(error.message);
    }
  };

  export const getCollegeByCourses = async (course, page = 1) => {
    const url = `${BASE_URL}/api/v1/college/course?page=${page}&course=${course}`;
    try {
      const result = await apiCalls("get", url);
      console.log(result)
      return result.data;
    } catch (error) {
        console.error("College Error", error.message);
        throw new Error(error.message);
    }
  };

  export const getCollegeById = async (collegeId) => {
    const url = `${BASE_URL}/api/v1/college/id/${collegeId}`;
    try {
      const result = await apiCalls("get", url);
      return result.data;
    } catch (error) {
        console.error("College Error", error.message);
        throw new Error(error.message);
    }
  };

  export const getSimilarColleges = async (state, courses, noOfStudents, page = 1) => {
    const url = `${BASE_URL}/api/v1/college/similar?page=${page}&courses=${courses}&state=${state}&noOfStudents=${noOfStudents}`;
    try {
      const result = await apiCalls("get", url);
      return result.data;
    } catch (error) {
        console.error("College Error", error.message);
        throw new Error(error.message);
    }
  };

  export const getStudent = async (studentId) => {
    const url = `${BASE_URL}/api/v1/student/id/${studentId}`;
    try {
      const result = await apiCalls("get", url);
      return result.data;
    } catch (error) {
        console.error("College Error", error.message);
        throw new Error(error.message);
    }
  };

  export const getStudentByCollegeId = async (collegeId, page = 1) => {
    const url = `${BASE_URL}/api/v1/student/byCollege/${collegeId}?page=${page}`;
    try {
      const result = await apiCalls("get", url);
      return result.data;
    } catch (error) {
        console.error("College Error", error.message);
        throw new Error(error.message);
    }
  };