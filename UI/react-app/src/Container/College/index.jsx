import React, { useState, useEffect, Fragment } from "react";
import {
  getCollegeById,
  getSimilarColleges,
  getStudentByCollegeId,
} from "../../actions/college.action";
import Card from "../../components/Card/Card";
import Pagination from "react-paginate";

const College = (props) => {
  console.log("propsss", props);
  const [collegeId, setCollegeId] = useState(props.match.params.id);
  const [collegeInfo, setCollegeInfo] = useState({});
  const [collegeDetailFetched, setCollegeDetailFetched] = useState(false);
  const [courses, setCourses] = useState("");
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  const [currentStudentPage, setStudentCurrentPage] = useState(1);
  const [pageCountStudent, setPageCountStudent] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [SimilarColleges, setSimilarColleges] = useState([])

  useEffect(() => {
    collegeDetails();
  }, []);
  const collegeDetails = async () => {
    let collegeInfo = await getCollegeById(collegeId);
    console.log("college iNfo", collegeInfo.college[0]);

    let courses = "";
    collegeInfo.college[0].courses.forEach((element) => {
      courses += element + " ";
      setCourses(courses);
    });
    setCollegeInfo(collegeInfo.college[0]);
    setCollegeDetailFetched(true);

    let studentsData = await getStudentByCollegeId(collegeId);

    setPageCountStudent(parseInt(studentsData.total) / studentsData.perPage);
    console.log("studenstsss", studentsData.students);

    setStudents(studentsData.students);

    setStudentsLoading(true);


    let similarCLGData = await getSimilarColleges(collegeInfo.college[0].state, collegeInfo.college[0].courses[0], collegeInfo.college[0].noOfStudents);
    console.log("similarrrrrrrrrr", similarCLGData);

    setPageCount(parseInt(similarCLGData.total) / similarCLGData.perPage);

    setSimilarColleges(similarCLGData.result.filter((ele => ele._id !== collegeId)));

    setStudentsLoading(true);
  };

  const handleStudentPageClick = (event) => {
    getStudentByCollegeId(collegeId, currentStudentPage).then((data) => {
      setStudents(data.students);

      console.log("statessss", data.students);
    });
    setStudentCurrentPage(event.selected);
  };

  const handlePageClick = (event) => {
    getSimilarColleges(collegeInfo.state, collegeInfo.courses, collegeInfo.noOfStudents, currentPage).then((data) => {
      setStudents(data.students);

      console.log("statessss", data.students);
    });
    setCurrentPage(event.selected);
  };

  return (
    <main className="college">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-md-12">
            {collegeDetailFetched && (
              <Fragment>
                <section className="user_name p-3">
                  <Card>
                    <header className="header m-3">
                      <h1>{collegeInfo.name}</h1>
                    </header>
                  </Card>
                </section>

                <section className=" mt-3 user_detail">
                  <Card>
                    <div className=" row personal_info m-3">
                      <div className="col-md-5">
                        <h4>COLLEGE INFORMATION</h4>
                        <ul className="details mt-3">
                          <li className="user_content">
                            <label>Name</label>
                            <div>{collegeInfo.name}</div>
                          </li>

                          <li className="user_content">
                            <label>Year Founded</label>
                            <div>{collegeInfo.yearFounded}</div>
                          </li>

                          <li className="user_content">
                            <label>Address</label>
                            <div>
                              {collegeInfo.city} {collegeInfo.state}{" "}
                              {collegeInfo.country}
                            </div>
                          </li>

                          <li className="user_content">
                            <label>No Of Students</label>
                            <div>{collegeInfo.noOfStudents}</div>
                          </li>

                          <li className="user_content">
                            <label>Courses</label>
                            <div>{courses}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </section>

                <section className=" mt-3 mb-2">
                  <Card>
                    <div className="card_height">
                      <div className="device_list ml-4 mt-4 mb-1 mr-4">
                        <div className="d-flex justify-content-between align-items-center refresh_icon">
                          <h4>STUDENTS</h4>
                          {/* {loading ? (
                              <Spinner size="25px" />
                            ) : (
                              <i
                                className="icon-refresh"
                                onClick={() => setReload(!reload)}
                              ></i>
                            )} */}
                        </div>
                        <div className="table-responsive ">
                          <table className="table ss_table mb-0">
                            <thead>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Year of Batch</th>
                                <th scope="col">Skills</th>
                              </tr>
                            </thead>
                            <tbody>
                              {students.length === 0 && (
                                <tr>
                                  <td
                                    colSpan="20"
                                    className="text-center no-file-row"
                                  >
                                    There is no college
                                  </td>
                                </tr>
                              )}
                              {students
                                .sort(
                                  (a, b) =>
                                    new Date(b.updated_at).getTime() -
                                    new Date(a.updated_at).getTime()
                                )
                                .map((student, i) => {
                                  return (
                                    <tr
                                      key={"fl" + i}
                                      onClick={() => {
                                        console.log("FURRRRRRRR", student._id);
                                        return props.history.push(
                                          `/app/state/student/${student._id}`
                                        );
                                      }}
                                    >
                                      <td
                                        className="ss-text-medium ss-text-dark ss-text-weight-300"
                                        id={`fn${i}`}
                                      >
                                        <span className="icon-files mr-2"></span>
                                        <span>{student.name}</span>
                                      </td>
                                      <td className="ss-text-medium ss-text-dark ss-text-weight-300">
                                        {student.yearOfBatch}
                                      </td>

                                      <td className="ss-text-medium ss-text-dark ss-text-weight-300">
                                        {student.skills}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          <div className="ss-pagination-container">
                            <Pagination
                              previousLabel={
                                <span className="icon-left-arrow"></span>
                              }
                              nextLabel={
                                <span className="icon-right-arrow"></span>
                              }
                              breakLabel={"..."}
                              pageCount={pageCountStudent}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={(e) => handleStudentPageClick(e)}
                              containerClassName={"ss-pagination"}
                              pageClassName={
                                "ss-pagination-item ss-text-medium"
                              }
                              // activeClassName={this.state.currentPageClass}
                              forcePage={parseInt(currentStudentPage)}
                            ></Pagination>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </section>

                <section className=" mt-3 mb-2">
                  <Card>
                    {/* <div className="card_height">
                      <div className="device_list ml-4 mt-4 mb-1 mr-4"> */}
                    <div className="d-flex justify-content-between align-items-center refresh_icon">
                      <h4>SIMILAR COLLEGES</h4>
                    </div>

                    <div className="row justify-content">
                      <div className="col-12 fileshare-table">
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th className="ss-text-medium ss-text-dark">
                                Name{" "}
                                <span className="icon-upside-down ss-text-medium-2 "></span>
                              </th>
                              <th className="ss-text-medium ss-text-dark">
                                Year Founded
                                <span className="icon-upside-down ss-text-medium-2"></span>
                              </th>
                              <th className="ss-text-medium ss-text-dark">
                                Address
                                <span className="icon-upside-down ss-text-medium-2"></span>
                              </th>

                              <th className="ss-text-medium ss-text-dark">
                                No Of Students
                                <span className="icon-upside-down ss-text-medium-2"></span>
                              </th>
                              
                            </tr>
                          </thead>
                          <tbody>
                            {SimilarColleges.length === 0 && (
                              <tr>
                                <td
                                  colSpan="20"
                                  className="text-center no-file-row"
                                >
                                  There is no college
                                </td>
                              </tr>
                            )}
                            {SimilarColleges
                              .sort(
                                (a, b) =>
                                  new Date(b.updated_at).getTime() -
                                  new Date(a.updated_at).getTime()
                              )
                              .map((SimilarCollege, i) => {
                                return (
                                  <tr
                                    key={"fl" + i}
                                    // onClick={() => {
                                    //   console.log(
                                    //     "FURRRRRRRR",
                                    //     SimilarCollege._id
                                    //   );
                                    //   return props.history.push(
                                    //     `/app/state/${SimilarCollege._id}`
                                    //   );
                                    // }}
                                  >
                                    <td
                                      className="ss-text-medium ss-text-dark ss-text-weight-300"
                                      id={`fn${i}`}
                                    >
                                      <span className="icon-files mr-2"></span>
                                      <span>{SimilarCollege.name}</span>
                                    </td>
                                    <td className="ss-text-medium ss-text-dark ss-text-weight-300">
                                      {SimilarCollege.yearFounded}
                                    </td>
                                    <td className="ss-text-medium ss-text-dark ss-text-weight-300">
                                      {SimilarCollege.city +
                                        " " +
                                        SimilarCollege.state +
                                        " " +
                                        SimilarCollege.country}
                                    </td>
                                    <td className="ss-text-medium ss-text-dark ss-text-weight-300">
                                      {SimilarCollege.noOfStudents}
                                    </td>
                                    
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <div className="ss-pagination-container">
                          <Pagination
                            previousLabel={
                              <span className="icon-left-arrow"></span>
                            }
                            nextLabel={
                              <span className="icon-right-arrow"></span>
                            }
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(e) => handlePageClick(e)}
                            containerClassName={"ss-pagination"}
                            pageClassName={"ss-pagination-item ss-text-medium"}
                            // activeClassName={this.state.currentPageClass}
                            forcePage={parseInt(currentPage)}
                          ></Pagination>
                        </div>
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

export default College;
