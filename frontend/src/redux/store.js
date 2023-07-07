import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { loadWorkReducer } from "./reducers/workReducer";
import { loadWorkTypeReducer } from "./reducers/taskTypeReducer";
import { userReducerLogout, userReducerProfile, userReducerSignIn } from "./reducers/userReducer";

// combine reducers
const reducers = combineReducers({
    loadTasks: loadWorkReducer,
    //taskType: loadWorkTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile
});

// Initial State
let initialState = {
    signIn: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    }
};
const middleware = [thunk];
const store = configureStore({reducer:reducers}, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;