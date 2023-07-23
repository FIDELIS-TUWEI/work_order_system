import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducerLogout, userReducerSignIn } from "./reducers/userReducer";
import userSlice from "./slice/userSlice";
import taskSlice from "./slice/taskSlice";
import loadingSlice from "./slice/loadingSlice";

// combine reducers
const reducers = combineReducers({
    loading: loadingSlice,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    users: userSlice,
    tasks: taskSlice,
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