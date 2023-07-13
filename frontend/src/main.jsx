import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';

import { Provider } from 'react-redux';
import store from './utils/redux/store';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
)
