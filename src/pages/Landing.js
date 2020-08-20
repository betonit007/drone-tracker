import React from "react";
import {Link} from 'react-router-dom';
import SignIn from "../components/auth/SignIn";
import GoogleFacebookSignin from "../components/auth/GoogleFacebookSignin";

const Landing = () => {
  return (
    <div className="landing-page-container flex justify-center">
      <div className="container flex flex-col h-full items-center justify-center">
        <div className='flex items-center relative'>
          <span className='landing-title m-0'>DR</span>
          <img 
            className='radar-img'
            src='./radar.png' 
            alt="radar"
            />
          <span className='landing-title'>NE</span>
        </div>
        <div className='text-gray-600 subtitle'>TRACKER</div>
        <SignIn />
        <GoogleFacebookSignin />
        <Link className='text-white pt-4' to='./register'>Or click here to register!</Link>
      </div>
    </div>
  );
};

export default Landing;
