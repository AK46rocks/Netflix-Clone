import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase";
import "./Login.css";

const Login = ({ email }) => {
  const [show, setShow] = useState(false);
  const [emailField, setEmailField] = useState(email);
  const [userNameField, setUserNameField] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userNameRef = useRef(null);

  const signInWithGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.alert("Signed with Google: ", user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const registerUser = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {
        updateProfile(auth.currentUser, { displayName: userNameField }).catch(
          (error) => console.log(error.message)
        );
        alert("user registered sucessfully!!");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        alert(error.message);
      });
  };

  const signUpUser = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {
        alert("Signed In Sucessfully!!");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        alert(error.message);
      });
  };
  return (
    <>
      <div className="login__panel">
        {!show ? (
          <>
            <form action="#">
              <div className="card">
                <h1 className="login__heading">Sign In</h1>
                <input
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  value={emailField}
                  onChange={(e) => setEmailField(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
                <button
                  className="btn login__btn"
                  type="submit"
                  onClick={signUpUser}
                >
                  {!loading ? (
                    "Sign In"
                  ) : (
                    <>
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  )}
                </button>
                <div className="divider">
                  <hr className="left" />
                  OR
                  <hr className="right" />
                </div>
                <button
                  className="btn google_btn mt-2"
                  onClick={signInWithGoogle}
                >
                  <img src="https://img.icons8.com/fluency/28/000000/google-logo.png" />
                  &nbsp; Sign in with Google
                </button>
                <h6>
                  New to Netflix? &nbsp;
                  <span className="register" onClick={() => setShow(true)}>
                    Sign up now
                  </span>
                </h6>
              </div>
            </form>
          </>
        ) : (
          <>
            <form action="#">
              <div className="card">
                <h1 className="login__heading">Register</h1>
                <input
                  type="name"
                  placeholder="Full Name"
                  ref={userNameRef}
                  value={userNameField}
                  onChange={(e) => setUserNameField(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  value={emailField}
                  onChange={(e) => setEmailField(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
                <button
                  className="btn login__btn"
                  type="submit"
                  onClick={registerUser}
                >
                  {!loading ? (
                    "Register"
                  ) : (
                    <>
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  )}
                </button>
                <div className="divider">
                  <hr className="left" />
                  OR
                  <hr className="right" />
                </div>
                <button
                  className="btn google_btn mt-2"
                  onClick={signInWithGoogle}
                >
                  <img src="https://img.icons8.com/fluency/28/000000/google-logo.png" />
                  &nbsp;Sign in with Google
                </button>
                <h6>
                  Already have account?
                  <br />
                  <span className="register" onClick={() => setShow(false)}>
                    Sign in now
                  </span>
                </h6>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
