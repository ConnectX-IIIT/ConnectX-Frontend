import React from "react";
import GoogleIcon from "../../assets/signinup_page/ic_google.svg";
import "../../styles/Signup/SignUpFormBottom.css";

function SignUpFormBottom() {
  return (
    <div className="SignUpformBottom">
      <p id="SignUpformBottomPara"> Or continue with</p>
      <div className="SignUpBottomImageContainer">
        <img src={GoogleIcon} alt="Google Image" />
      </div>
      <a href="#" id="SignUpformBottomAnchor">
        Forgot Password?
      </a>
    </div>
  );
}

export default SignUpFormBottom;
