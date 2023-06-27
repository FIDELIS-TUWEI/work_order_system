import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools-extension";
import { loadWorkReducer } from "./reducers/workReducer";

// combine reducers
const reducer = combineReducers({
    loadTasks: loadWorkReducer
});

// Initial State
let initialState = {};
const middleware = [thunk];
const store = configureStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;