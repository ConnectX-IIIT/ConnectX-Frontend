import React, { useState } from "react";
import {
  BrowserRouter as Router,
  useRouteMatch,
  NavLink,
} from "react-router-dom";

import "../../styles/HomePage/Navbar.css";

import FormInput from "../signUpCompontents/FormInput";
import ImgStackHome from "./ImgStackHome";
import connectxlogo from "../../assets/_logo/svg/logo.svg";
import searchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";

import homeImage from "../../assets/home/top_navbar/ic_home.svg";
import hoverHomeImage from "../../assets/home/top_navbar/h_ic_home.svg";
import activeHomeImage from "../../assets/home/top_navbar/a_ic_home.svg";

import queriesImage from "../../assets/home/top_navbar/ic_queries.svg";
import hoverQueriesImage from "../../assets/home/top_navbar/h_ic_queries.svg";
import activeQueriesImage from "../../assets/home/top_navbar/a_ic_queries.svg";

import connectionImage from "../../assets/home/top_navbar/ic_connections.svg";
import hoverConnectionImage from "../../assets/home/top_navbar/h_ic_connections.svg";
import activeConnectionImage from "../../assets/home/top_navbar/a_ic_connections.svg";

import messageImage from "../../assets/home/top_navbar/ic_messages.svg";
import hoverMessageImage from "../../assets/home/top_navbar/h_ic_messages.svg";
import activeMessageImage from "../../assets/home/top_navbar/a_ic_messages.svg";

import UserProfileDefaultIcon from "../../assets/profile/user_profile_default_icon.svg";
import HomePageFormInput from "./HomePageFormInput";
import { useStateValue } from "../../helper/state_provider";

function Navbar({
  isSearchBarClicked,
  onSearchBarBlur,
  onChangeFunction,
  inputValue,
}) {
  let { url } = useRouteMatch();
  const [{ userDetails }, dispatch] = useStateValue();

  const [navLocation, setNavLocation] = useState("home");
  const imgURL = "https://obscure-ridge-13663.herokuapp.com/user/fetch/";

  const handlePhoto = (photo) => {
    if (photo) {
      return imgURL + photo;
    }
    return UserProfileDefaultIcon;
  };

  return (
    <nav className="Navbar" onClick={onSearchBarBlur}>
      <div className="HomeNavLeft">
        <img src={connectxlogo} alt="connectxlogo" className="ConnectxLogo" />
        <div onClick={isSearchBarClicked}>
          <HomePageFormInput
            inputValue={inputValue}
            onChangeFunction={onChangeFunction}
          />
          <img src={searchIcon} alt="searchicon" className="NavbarSearchIcon" />
        </div>
      </div>
      <div className="HomeNavRight">
        <NavLink
          to={`${url}`}
          isActive={(match, location) => {
            setNavLocation(location.pathname);
          }}
        >
          <ImgStackHome
            normalImageSrc={homeImage}
            hoverImageSrc={hoverHomeImage}
            activeImageSrc={activeHomeImage}
            isActive={navLocation === "/home" ? true : false}
          />
        </NavLink>
        <NavLink to={`${url}/queries`}>
          <ImgStackHome
            normalImageSrc={queriesImage}
            hoverImageSrc={hoverQueriesImage}
            activeImageSrc={activeQueriesImage}
            isActive={navLocation === "/home/queries" ? true : false}
          />
        </NavLink>
        <NavLink to={`${url}/connection`}>
          <ImgStackHome
            normalImageSrc={connectionImage}
            hoverImageSrc={hoverConnectionImage}
            activeImageSrc={activeConnectionImage}
            isActive={navLocation === "/home/connection" ? true : false}
          />
        </NavLink>
        <NavLink to={`${url}/message`}>
          <ImgStackHome
            normalImageSrc={messageImage}
            hoverImageSrc={hoverMessageImage}
            activeImageSrc={activeMessageImage}
            isActive={navLocation === "/home/message" ? true : false}
          />
        </NavLink>

        <div className="NavbarUserProfile">
          <img
            src={handlePhoto(userDetails.profilePicture)}
            alt="user profile icon"
            className="NavbarUserProfile"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
