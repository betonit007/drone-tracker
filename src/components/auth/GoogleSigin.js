import React from "react";
import { signInWithGoogle } from "../../firebase/firebase.utils";

const buttonStyle = {
  padding: "5px",
  backgroundColor: "#4C8BF5",
  color: "#fff",
  boxShadow: "0 2px 3px rgba(0, 0, 0, 0.397)",
  borderRadius: "3px",
  border: "none",
};

const iconStyle = {
  border: "1px solid #fff",
  padding: "2px 3px",
  borderRadius: "4px",
};

const GoogleSigin = () => {
  return (
    <div>
      <button
        style={buttonStyle}
        className="google-signin"
        onClick={() => signInWithGoogle()}
      >
        <i style={iconStyle} className="fa fa-google"></i> Sign In With Google
      </button>
    </div>
  );
};

export default GoogleSigin;
