import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../reducers/userSlice";
import "./Footer.css";

const Footer = () => {
  const user = useSelector(userSelector);
  return (
    <footer>
      <div className="container section__margin ">
        {/* <div className="footer-btn">
          <a href="#/tswap">Join Now</a>
        </div> */}

        <div className="row">
          <div className="col-12 col-lg-10 mx-auto">
            <div className="row">
              {/* first */}
              <div className="col-6 col-lg-3">
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                </ul>
              </div>
              {/* second */}
              <div className="col-6 col-lg-3">
                <h4>Genres</h4>
                <ul>
                  <li>
                    <a href="#">Action</a>
                  </li>
                  <li>
                    <a href="#">Adventure</a>
                  </li>
                  <li>
                    <a href="#">Comedy</a>
                  </li>
                  <li>
                    <a href="#">Romance</a>
                  </li>
                </ul>
              </div>
              {/* third */}
              <div className="col-6 col-lg-3">
                <h4>Content</h4>
                <ul>
                  <li>
                    <a href="#">Netflix</a>
                  </li>
                  <li>
                    <a href="#">Amazon Prime</a>
                  </li>
                </ul>
              </div>
              {/* fourth */}
              <div className="col-6 col-lg-3 text-right text-center footer__icons ">
                <h4>Follow Us</h4>
                <div className="row mt-4">
                  <div className="col-3 mx-auto">
                    <a href="#">
                      <i className="fab fa-facebook fontawesome-style "></i>
                    </a>
                  </div>
                  <div className="col-3 mx-auto">
                    <a href="#">
                      <i className="fab fa-instagram fontawesome-style gradient__text"></i>
                    </a>
                  </div>
                  <div className="col-3 mx-auto">
                    <a href="#">
                      <i className="fab fa-twitter fontawesome-style"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <hr className="line" />
            <div className="mt-5 footer-reserved ">
              <p className="main-hero-para text-center w-100">
                © 2026 Hulku TV. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
