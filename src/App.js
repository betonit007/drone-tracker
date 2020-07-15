import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/auth/authState";
import PrivateRoute from './routing/PrivateRoute'
import Test from "./pages/Test";
import Landing from "./pages/Landing";
import Register from './pages/Register'
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";

import "./assets/main.css";

const App = () => {
  const { initializeAuth, authState } = useContext(AuthContext);

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={()=> authState ? <Redirect to='/map'/> : <Landing />} />
        <Route exact path="/register" render={()=> authState ? <Redirect to='/map'/> : <Register />} />
        <Route exact path="/test" component={Test} />
        <PrivateRoute exact path="/map" component={Main} authState={authState}/>
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
