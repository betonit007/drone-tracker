import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import DataState from './context/data/dataState';
import AuthState from './context/auth/authState';
import Test from './pages/Test';
import SignInUp from './pages/SignInUp';

import './assets/main.css'


const App = () => {
  
    return (
      <Router>
          <AuthState>
            <DataState>
                <Switch>
                  <Route exact path='/' component={SignInUp} />   
                  <Route exact path='/test' component={Test} />
                </Switch>
            </DataState>
          </AuthState>
      </Router>
    )
}

export default App
