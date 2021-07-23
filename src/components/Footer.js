import React from "react";
import Connectxlogo from "../assets/_logo/svg/logo_2.0.svg";
import Instituelogo from "../assets/_institute_logo/insitute_logo.svg";
import linkedInIcon from "../assets/footer/ic_linkedin.svg";
import githubIcon from "../assets/footer/ic_github.svg";
import mailIcon from "../assets/footer/ic_mail.svg";
import "../styles/Footer.css";

const General = ["Login", "Sign-Up", "About", "Home", "Admin"];
const Browse = [
  "Projects",
  "Jobs",
  "Queries",
  "Connection",
  "Message",
  "Notification",
  "profile",
];
const Support = ["help.connectx@gmail.com", "(+91) 9113742865"];

const GeneralList = General.map((General, index) => {
  return (
    <li key={index}>
      <a href="#">{General}</a>
    </li>
  );
});
const BrowseList = Browse.map((Browse, index) => {
  return (
    <li key={index}>
      <a href="#">{Browse}</a>
    </li>
  );
});
const SupportList = Support.map((Support, index) => {
  return (
    <li key={index}>
      <a href="#">{Support}</a>
    </li>
  );
});

function Footer() {
  return (
    <footer className="LandingPageFooter">
      <div className="footerUpperContainer">
        <div className="footerLinks">
          <div style={{ marginLeft: "7.18vw" }}>
            General
            <ul>{GeneralList}</ul>
          </div>
          <div style={{ marginLeft: "6.04vw" }}>
            Browse
            <ul>{BrowseList}</ul>
          </div>
          <div style={{ marginLeft: "6.04vw" }}>
            Support
            <ul>{SupportList}</ul>
          </div>
        </div>
        <img src={Connectxlogo} alt="ConnectxLogo" />
      </div>

      <div className="footerLowerContainer">
        <div className="instiuteinformation">
          <div className="logoOutercontainer">
            <div className="logoInnerContainer">
              <img src={Instituelogo} alt="Institutelogo" />
            </div>
          </div>
          <p>
            Atal Bihari Vajpayee Indian Institute of Information Technology and
            Management, Gwalior
          </p>
        </div>
        <div className="footerRightIcons">
          <div className="footerIcons">
            <img src={linkedInIcon} alt="" />
            <img src={githubIcon} alt="" />
            <img src={mailIcon} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
