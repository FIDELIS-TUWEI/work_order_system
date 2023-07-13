import React from 'react'
import ReactDOM from 'react-dom/client';
import App from "./App"
import router from './routes';
import {RouterProvider} from "react-router-dom"
import { Provider } from 'react-redux';
import store from './utils/redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Provider store={store}>
        <App />
      </Provider>
    </RouterProvider>
  </React.StrictMode>,
)
