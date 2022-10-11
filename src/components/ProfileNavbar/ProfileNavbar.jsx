import React from "react";
import { NavLink } from "react-router-dom";
import "./ProfileNavbar.css";

const ProfileNavbar = () => {
  return (
    <>
      <div className="new__nav">
        <div className="container">
          <div className="new__nav__content">
            <div className="netflix__img">
              <NavLink to="/">
                <img src="/images/logo.png" alt="Img" className="net__logo" />
              </NavLink>
            </div>
            <div className="user__avatar">
              <NavLink to="/profile">
                <img
                  src="/images/avatar.png"
                  alt="navLogo"
                  className="net__avatar"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileNavbar;
