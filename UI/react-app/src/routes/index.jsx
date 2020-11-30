import React from "react";
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";

import AppRoute from "./AppRoute";

// 404
import Page404 from "./Page404";
import ChartByStates from "../Container/ChartByState/index";
import ChartByCourses from "../Container/ChartByCourses/index";
import College from "../Container/College/index"
import LeftNavbar from "../components/Header/LeftNavbar";
import Student from "../Container/Students/index"

const Root = () => {
  console.log("matcg");

  return (
    <Router history={history}>
      <div className="ss_app_layout">
      <div className="ss_app_layout_item_1">
        <LeftNavbar/>
      </div>
     
      <div className="ss_app_layout_item_3">
        <Switch>
          {/* app route */}
          <Route exact path="/" component={ChartByStates} />
          <Route exact path="/app/state" component={ChartByStates} />
          <Route path="/app/state/student/:id" component={Student} />

          <Route path="/app/state/:id" component={College} />
          <Route exact path="/app/courses" component={ChartByCourses} />
          <Route path="/app/courses/:id" component={ChartByCourses} />

          {/* 404 */}
          <Route exact path="/404" component={Page404} />
          <Route path="*" render={() => <Redirect to="/404" />} />
        </Switch>
        </div></div>
    </Router>
  );
};


export default Root;
