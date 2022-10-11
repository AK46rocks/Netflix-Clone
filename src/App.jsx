import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import SignupScreen from "./pages/SignupScreen/SignupScreen";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, userSelector } from "./reducers/userSlice";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import Loading from "./components/Loading/Loading";
import MovieScreen from "./pages/MovieScreen/MovieScreen";
import ScrollToTop from "./ScrollToTop";
import SearchScreen from "./pages/SearchScreen/SearchScreen";
import { addList } from "./actions";

function App() {
  const user = useSelector(userSelector);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            displayName: userAuth?.displayName || "User",
          })
        );
        setLoading(false);
      } else {
        setLoading(false);
        dispatch(logout);
      }
    });
    return unsubcribe;
  }, []);

  useEffect(() => {
    const getLocalData = () => {
      let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
      if (keys) {
        while (i--) {
          values.push(JSON.parse(localStorage.getItem(keys[i])));
        }
        dispatch(addList(values));
      }
    };
    getLocalData();
  }, []);

  return (
    <>
      <div className="app">
        {loading ? (
          <Loading />
        ) : !user ? (
          <>
            <SignupScreen />
          </>
        ) : (
          <>
            <ScrollToTop>
              <Routes>
                <Route exact path="/" element={<HomeScreen />}></Route>
                <Route
                  exact
                  path="/profile"
                  element={<ProfileScreen />}
                ></Route>
                <Route
                  exact
                  path="/content/:mediaType/:id"
                  element={<MovieScreen />}
                ></Route>
                <Route exact path="/search" element={<SearchScreen />}></Route>
              </Routes>
            </ScrollToTop>
          </>
        )}
      </div>
    </>
  );
}

export default App;
