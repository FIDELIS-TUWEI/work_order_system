import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
import App from './App';

import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "./state/index";
import userReducer from './state/userSlice';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'state/api';

const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
