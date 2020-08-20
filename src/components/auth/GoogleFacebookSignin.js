import React from "react";
import { signInWithGoogle, signInWithFaceBook } from "../../firebase/firebase.utils";

const facebookButtonStyle = {
  padding: "12px",
  backgroundColor: "#4C8BF5",
  color: "#fff",
  boxShadow: "0 2px 3px rgba(0, 0, 0, 0.397)",
  borderRadius: "3px",
  border: "none",
  width: "100%"
};

const googleButtonStyle = {
  padding: "12px",
  backgroundColor: "#de5246",
  color: "#fff",
  boxShadow: "0 2px 3px rgba(0, 0, 0, 0.397)",
  borderRadius: "3px",
  border: "none",
  width: "100%"
};


const iconStyle = {
  border: "1px solid #fff",
  padding: "2px 3px",
  borderRadius: "4px",
};

const GoogleSigin = () => {
  return (
    <div className='mobile-width p-4'>
      <div className='mb-2'>
        <button
          style={googleButtonStyle}
          onClick={() => signInWithGoogle()}
        >
          <i style={iconStyle} className="fa fa-google"></i> Sign In With Google
      </button>
      </div>
      <div>
        <button
          style={facebookButtonStyle}
          onClick={() => signInWithFaceBook()}
        >
          <i style={iconStyle} className="fa fa-facebook"></i> Sign In With Facebook
      </button>
      </div>
    </div>
  );
};

export default GoogleSigin;
