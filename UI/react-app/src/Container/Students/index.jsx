import React, { useState, useEffect, Fragment } from "react";
import {
  getStudent
} from "../../actions/college.action";
import Card from "../../components/Card/Card";
import Pagination from "react-paginate";

const Student = (props) => {
  console.log("propsss", props);
  const [studentId, setStudentId] = useState(props.match.params.id);
  const [skills, setSkills] = useState("");
  const [student, setStudent] = useState({});
  const [studentLoading, setStudentsLoading] = useState(false);

  useEffect(() => {
    studentDetails();
  }, []);
  const studentDetails = async () => {
    let data = await getStudent(studentId);
    console.log("student iNfo", data.result[0]);

    let skills = "";
    data.result[0].skills.forEach((element) => {
      skills += element + " ";
      setSkills(skills);
    });
    setStudent(data.result[0]);
    setStudentsLoading(true);
  };


  return (
    <main className="college">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-md-12">
            {studentLoading && (
              <Fragment>
                <section className="user_name p-3">
                  <Card>
                    <header className="header m-3">
                      <h1>{student.name}</h1>
                    </header>
                  </Card>
                </section>

                <section className=" mt-3 user_detail">
                  <Card>
                    <div className=" row personal_info m-3">
                      <div className="col-md-5">
                        <h4>STUDENT INFORMATION</h4>
                        <ul className="details mt-3">
                          <li className="user_content">
                            <label>Name</label>
                            <div>{student.name}</div>
                          </li>

                          <li className="user_content">
                            <label>Year Of Batch</label>
                            <div>{student.yearOfBatch}</div>
                          </li>

                    

                          <li className="user_content">
                            <label>Skills</label>
                            <div>{skills}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </section>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Student;
