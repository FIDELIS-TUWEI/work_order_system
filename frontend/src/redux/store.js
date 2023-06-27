import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools-extension";

// combine reducers
const reducer = combineReducers({});

// Initial State
let initialState = {};
const middleware = [thunk];
const store = configureStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;