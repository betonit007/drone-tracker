import React from "react";
import SignIn from "../components/auth/SignIn";
import GoogleSignin from "../components/auth/GoogleSigin";

const Landing = () => {
  return (
    <div className="landing-page-container flex justify-center">
      <div className="container flex flex-col h-full items-center justify-center">
        <SignIn />
        <GoogleSignin />
      </div>
    </div>
  );
};

export default Landing;
