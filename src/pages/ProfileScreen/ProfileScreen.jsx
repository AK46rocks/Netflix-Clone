import React from "react";
import "./ProfileScreen.css";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { userSelector } from "../../reducers/userSlice";

const ProfileScreen = () => {
  const user = useSelector(userSelector);

  const userSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="profileScreen">
        <ProfileNavbar />

        <div className="profileScreen__content">
          <h1>Hello, {user.displayName}</h1>
          <div className="profileScreen__info">
            <a href="/profile">
              <img
                src="https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png"
                alt="navLogo"
              />
            </a>

            <div className="profileScreen__details">
              <h2>{user.email} </h2>
              <div className="profileScreen__plans">
                <h3>Plans (Current Plan: Premium)</h3>
                <h6 className="renewal__date">Renewal Date: date</h6>

                <div className="plans">
                  <h6>
                    Standard <br /> 1080p
                  </h6>
                  <button className="plan__btn">Subscribe</button>
                </div>
                <div className="plans">
                  <h6>
                    Basic <br /> 480p
                  </h6>
                  <button className="plan__btn">Subscribe</button>
                </div>
                <div className="plans">
                  <h6>
                    Premium <br /> 4K+HDR
                  </h6>
                  <button className="plan__btn__current">
                    Current Package
                  </button>
                </div>

                <button
                  onClick={userSignOut}
                  className="profileScreen__signOut"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
