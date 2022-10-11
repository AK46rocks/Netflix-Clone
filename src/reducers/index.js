import { combineReducers } from "redux";
import movieLocalStorage from "./movieLocalStorage";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  movieLocalStorage: movieLocalStorage,
  user: userReducer,
});

export default rootReducer;
