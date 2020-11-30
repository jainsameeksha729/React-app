const mongoose = require("./mongoose");

const college = require("./models/college.model");
const student = require("./models/student.model");
// open mongoose connection
mongoose.connect();

const insertCollegData = async () => {
    await college.insertMany([
        {
          name: "c7",
          yearFounded: 1996,
          city: "Bhopal",
          state: "MP",
          country: "India",
          noOfStudents: 1234,
          courses: ["CSE", "IT", "EC"],
        },
        {
          name: "c8",
          yearFounded: 1993,
          city: "Indore",
          state: "MP",
          country: "India",
          noOfStudents: 2333,
          courses: ["CSE", "IT"],
        },
        {
          name: "c9",
          yearFounded: 1993,
          city: "Delhi",
          state: "Delhi",
          country: "India",
          noOfStudents: 4000,
          courses: ["CSE", "IT"],
        },
      
      ]);
   console.log("inserted")   
}

insertCollegData()

const insertStudentData = async () => {
    await student.insertMany([
        {
          name: "s1",
          yearOfBatch: 1996,
          skills: ["c++", "JAVA"],
          collegeId: "5fc26f9c976b252b1978bbea"
        },
        {
            name: "s2",
            yearOfBatch: 1996,
            skills: ["c++", "JAVA"],
            collegeId: "5fc26f9c976b252b1978bbea"
          },
      
      ]);
   console.log("inserted")   
}

// insertStudentData()