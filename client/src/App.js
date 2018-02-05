import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

import * as routes from './constants/routes';

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path={routes.SIGN_IN} component={Signin} />
        <Route exact path={routes.BOOKS} component={Books} />
        <Route exact path={routes.DASHBOARD} component={Dashboard} />
        <Route exact path={routes.DETAIL} component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;

