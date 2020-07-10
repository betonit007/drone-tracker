import React from "react";
import ReactDOM from "react-dom";
import DataState from "./context/data/dataState";
import AuthState from "./context/auth/authState";
import App from "./App";

ReactDOM.render(
  <AuthState>
    <DataState>
      <App />
    </DataState>
  </AuthState>, document.getElementById('root')
);
