import React, { useState } from "react";
import { Fragment } from "react";
import Chart from "chart.js";
import { useEffect } from "react";
import _ from "lodash";
import {
  getAllCollege,
  getCollegeByState,
  getCollegeByCourses,
} from "../../actions/college.action";
import "./index.scss";
// import Card from "./components/card";
import Pagination from "react-paginate";
import "chartjs-plugin-labels";

import { withRouter, Link, NavLink } from "react-router-dom";
const perPage = 5;
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    labels: {
      render: "percentage",
      fontColor: ["black"],
      precision: 2,
      arc: true,
    },
  },
};
const ChartByState = (props) => {
  const [sharable, setSharable] = useState(null);
  const [collegeByStates, setCollegeByStates] = useState([]);
  const [canvasClicked, setCanvasClicked] = useState(false);
  const [reload, setReload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState("");
  const [pageCount, setPageCount] = useState(0);
  // const [doughnut, setDoughnutChart] = useState(null)
  useEffect(() => {
    if (reload) {
      setReload(false);
      updateChart();
    }
  });
  let updateChart = async () => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var canvas = document.getElementById("myChart");
    try {
      let allColleges = await getAllCollege();
      //   allColleges = [allColleges]
      let courses = {};
      for await (let college of allColleges.data) {
        for await (let course of college.courses) {
          if (courses[course] === undefined) {
            courses[course] = 1;
          } else {
            courses[course] += 1;
          }
        }
      }


      function random_rgba() {
        var o = Math.round,
          r = Math.random,
          s = 255;
        return (
          "rgba(" +
          o(r() * s) +
          "," +
          o(r() * s) +
          "," +
          o(r() * s) +
          "," +
          r().toFixed(1) +
          ")"
        );
      }
      let labels = Object.keys(courses);

      let values = Object.values(courses);

      function backColor() {
        // let count = 0;
        let colors = [];
        for (let count = 0; count < labels.length; count++) {
          colors.push(random_rgba());
          //   count++;
        }
        return colors;
      }
      let backgroundColors = backColor();

      let data = {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors,
            borderWidth: 3,
          },
        ],
      };

      // And for a doughnut chart
      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options,
      });

      // setDoughnutChart(myDoughnutChart)
      canvas.onclick = (e) => handleCanvasClicked(e, myDoughnutChart);
    } catch (error) {
      console.log("ERROR", error);
    }

    // return data
  };

  function handleCanvasClicked(evt, doughnut) {
    console.log("evttt", evt);
    var activePoints = doughnut.getElementsAtEvent(evt);
    console.log("activePoints", activePoints);

    if (activePoints[0]) {
      var chartData = activePoints[0]["_chart"].config.data;
      var idx = activePoints[0]["_index"];

      var label = chartData.labels[idx];
      var value = chartData.datasets[0].data[idx];
      var color = chartData.datasets[0].backgroundColor[idx]; //Or any other data you wish to take from the clicked slice

      console.log("LLLLLLLLLLLLLLLL", label);
      getCollegeByCourses(label, currentPage).then((data) => {
        setCanvasClicked(true);
        setCollegeByStates(data.result);
        setState(label);
        setPageCount(parseInt(data.total) / data.perPage);
        console.log("statessss", data.result);
      });
    }
  }

  const handlePageClick = (event) => {
    getCollegeByCourses(state, currentPage).then((data) => {
      setCanvasClicked(true);
      setCollegeByStates(data.result);

      console.log("statessss", data.result);
    });
    setCurrentPage(event.selected);
  };

  return (
    <section className="state">
      <div className="container-fluid">
        <div className="row justify-content">
          <div className="col-12">
            <canvas
              id="myChart"
              style={{ position: "relative", height: "40vh", width: "80vw" }}
            ></canvas>
          </div>
        </div>

        {canvasClicked && (
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
                  {collegeByStates.length === 0 && (
                    <tr>
                      <td colSpan="20" className="text-center no-file-row">
                        There is no college
                      </td>
                    </tr>
                  )}
                  {collegeByStates
                    .sort(
                      (a, b) =>
                        new Date(b.updated_at).getTime() -
                        new Date(a.updated_at).getTime()
                    )
                    .map((collegeByState, i) => {
                      return (
                        <tr
                          key={"fl" + i}
                          onClick={() => {
                            console.log("FURRRRRRRR", collegeByState._id);
                            return props.history.push(
                              `/app/state/${collegeByState._id}`
                            );
                          }}
                        >
                          <td
                            className="ss-text-medium ss-text-dark ss-text-weight-300"
                            id={`fn${i}`}
                          >
                            <span className="icon-files mr-2"></span>
                            <span>{collegeByState.name}</span>
                          </td>
                          <td className="ss-text-medium ss-text-dark ss-text-weight-300">
                            {collegeByState.yearFounded}
                          </td>
                          <td className="ss-text-medium ss-text-dark ss-text-weight-300">
                            {collegeByState.city +
                              " " +
                              collegeByState.state +
                              " " +
                              collegeByState.country}
                          </td>
                          <td className="ss-text-medium ss-text-dark ss-text-weight-300">
                            {collegeByState.noOfStudents}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="ss-pagination-container">
                <Pagination
                  previousLabel={<span className="icon-left-arrow"></span>}
                  nextLabel={<span className="icon-right-arrow"></span>}
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
        )}
      </div>
    </section>
  );
};

export default ChartByState;
