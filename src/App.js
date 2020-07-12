import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/auth/authState";
import Test from "./pages/Test";
import SignInUp from "./pages/SignInUp";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";

import "./assets/main.css";

const App = () => {
  const { initializeAuth } = useContext(AuthContext);

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignInUp} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/map" component={Main} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
