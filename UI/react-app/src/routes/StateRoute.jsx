import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ChartByStates from "../Container/ChartByState/index";

const StateRoute = (props) => {
  const { match } = props;
    console.log("match", match)
  return (
    <Route exact path="*" render={() => <ChartByStates />} />

    // <Switch>
    //   <Route exact path="/state" render={() => <ChartByStates />} />

    //   <Route path="*" render={() => <Redirect to={`${match.url}/state`} />} />
    // </Switch>
  );
};

export default StateRoute;
