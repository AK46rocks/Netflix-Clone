import React, { useState } from "react";
import Login from "../../components/Login/Login";
import "./SignupScreen.css";

const SignupScreen = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="signup">
        <div className="container">
          <div className="nav">
            <div className="netflix__img">
              <img src="./images/logo.png" alt="NetFlix_logo" />
            </div>
            <div className="signup__btn">
              <button className="btn" onClick={() => setShow(true)}>
                Sign In
              </button>
            </div>
          </div>
          {!show ? (
            <>
              <div className="signup__content">
                <h1>Unlimited movies, TV shows and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <h3>
                  Ready to watch? Enter your email to create or restart your
                  membership.
                </h3>
              </div>
              <div className="signup__form">
                <form>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="sumbit" onClick={() => setShow(true)}>
                    Get Started
                  </button>
                </form>
              </div>
            </>
          ) : (
            <Login email={email} />
          )}
        </div>
      </div>
    </>
  );
};

export default SignupScreen;
