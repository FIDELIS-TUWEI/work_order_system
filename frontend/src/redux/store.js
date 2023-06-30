import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { loadWorkReducer } from "./reducers/workReducer";
import { loadWorkTypeReducer } from "./reducers/taskTypeReducer";
import { userReducerSignIn } from "./reducers/userReducer";

// combine reducers
const reducers = combineReducers({
    loadTasks: loadWorkReducer,
    taskType: loadWorkTypeReducer,
    signIn: userReducerSignIn
});

// Initial State
let initialState = {};
const middleware = [thunk];
const store = configureStore({reducer:reducers}, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;