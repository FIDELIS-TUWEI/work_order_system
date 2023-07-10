import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducerLogout, userReducerSignIn } from "./reducers/userReducer";
import userSlice from "./slice/userSlice";
//import { addTaskReducer } from "./reducers/workReducer";
import taskSlice from "./slice/taskSlice";

// combine reducers
const reducers = combineReducers({
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    users: userSlice,
    tasks: taskSlice,
    //addTask: addTaskReducer
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