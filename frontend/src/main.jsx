import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';

import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "state";
import { Provider } from 'react-redux';
import App from './App';

const store = configureStore({
  reducer: {
    global: globalReducer
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />
    </Provider>
  </React.StrictMode>,
)
