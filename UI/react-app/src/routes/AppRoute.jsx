import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LeftNavbar from "../components/Header/LeftNavbar";

import StateRoute from "./StateRoute"

import ChartByStates from "../Container/ChartByState/index";

const AppRoute = (props) => {
  const { match } = props;
    console.log("matcg",match, match.url)
  return (
    <div className="ss_app_layout">
      <div className="ss_app_layout_item_1">
      <LeftNavbar/>
      </div>
     
      <div className="ss_app_layout_item_3">
          <Switch>
            <Route path={`/app/state`} component={Home} /> 
            <Route path={`/app/courses`} component={Home} /> 

          </Switch>
      </div>
    </div>
  );
};

const Home = () => {
    return (<div>
        <h1>Home page</h1>
    </div>)
}
export default AppRoute;
