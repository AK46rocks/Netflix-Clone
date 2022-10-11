import { createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducers/index";

// const store = configureStore({
//     reducer: {
//         rootReducer
//     }    
// });

const store = createStore(rootReducer);
export default store;