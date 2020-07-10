import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from './context/auth/authState'
import Test from "./pages/Test";
import SignInUp from "./pages/SignInUp";

import "./assets/main.css";
import AuthState from "./context/auth/authState";

const App = () => {

  const { initializeAuth } = useContext(AuthContext)
  
  useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignInUp} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </Router>
  );
};

export default App;
