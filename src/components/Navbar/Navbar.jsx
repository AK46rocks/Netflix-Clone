import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navChangeOnScroll = () => {
    if (window.scrollY >= 66) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const searchMovie = () => {
    setSearchInput(searchInput.trimStart());
    let isValid = false;
    let regex = /^[a-zA-Z0-9 ]*$/;
    isValid = regex.test(searchInput);

    if (searchInput.length == 0 || !isValid) {
      alert("Please enter valid input");
    } else {
      window.location.href = `/search?input=${searchInput}`;
    }
  };
  const listener = (event) => {
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      console.log("Enter key was pressed. Run your function.");
      event.preventDefault();
      if (searchInput.length > 0) {
        searchMovie();
      }
    }
  };
  document.addEventListener("keydown", listener);
  useEffect(() => {
    window.addEventListener("scroll", navChangeOnScroll);
  }, []);

  return (
    <>
      <nav
        className={
          show
            ? "navbar navbar-expand-md navbar-dark fixed-top navbar__dark overflow-hidden"
            : "navbar navbar-expand-md navbar-dark fixed-top overflow-hidden"
        }
      >
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img className="nav__logo" src="/images/logo.png" alt="navLogo" />
          </NavLink>
          <div className="search__content">
            <input
              className="search__input me-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              pattern="/^\s/"
              required
            />
            <button className="btn search__icon" onClick={searchMovie}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <NavLink className="" aria-current="page" to="/profile">
            <img
              className="nav__avatar"
              src="/images/avatar.png"
              alt="navLogo"
            />
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
